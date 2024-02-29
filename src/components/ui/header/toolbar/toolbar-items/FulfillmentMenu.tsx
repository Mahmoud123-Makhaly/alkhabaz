'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import { DropDown, IDropDownItem, Modal } from '@components';
import { Actions } from '@libs/actions';
import { useAppStore, useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import location from '@assets/svgs/navbar/location.svg';

const FulfillmentMenu = () => {
  const t = useTranslate('COMP_FulfillmentMenu');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { setSelectedInventory, selectedInventory, changePreloader } = useAppStore(state => ({
    setSelectedInventory: state.appAccount.setSelectedInventory,
    selectedInventory: state.appAccount.selectedInventory,
    changePreloader: state.layout.changePreloader,
  }));

  const [fulfillmentCenter, setFulfillmentCenter] = useState<{
    options?: Array<IDropDownItem>;
    raw?: Array<DTO.IFulfillmentCenterDTO>;
    selectedInventory?: DTO.IFulfillmentCenterDTO;
  }>();

  useEffect(() => {
    const loadFulfillmentCenters = async () => {
      const isMultipleWarehouse = await Actions.session.getStoreSettings('IS_MULTIPLE_WAREHOUSE');

      if (!fulfillmentCenter?.options && isMultipleWarehouse) {
        const {
          data: response,
          serverError,
          validationErrors,
        } = await Actions.fulfillmentCenters.getFulfillmentCenters();

        if (response?.data?.items && response.data.items.length)
          setFulfillmentCenter(prev => ({
            ...prev,
            options: response.data.items?.map(x => ({
              children: (
                <span
                  key={x.id}
                  onClick={() => {
                    setFulfillmentCenter(prev => ({ ...prev, selectedInventory: x }));
                  }}
                  className="text-start px-3 py-1 text-black d-block"
                >
                  {x.name}
                </span>
              ),
            })),
            raw: response.data.items,
          }));
      } else if (fulfillmentCenter?.raw && isMultipleWarehouse) {
        const savedInventory = await Actions.session.getSessionAppSettingValueByKey<{ id: string }>('INV');

        savedInventory?.id &&
          fulfillmentCenter?.raw?.some(x => x.id === savedInventory.id) &&
          setSelectedInventory &&
          setSelectedInventory(fulfillmentCenter.raw.find(x => x.id === savedInventory.id)!);

        if (!savedInventory) setModalOpen(true);
      }
    };

    loadFulfillmentCenters();
  }, [fulfillmentCenter, setSelectedInventory]);

  useEffect(() => {
    const onChange = async () => {
      if (fulfillmentCenter?.selectedInventory && fulfillmentCenter?.raw) {
        changePreloader && changePreloader('enable');

        const saveSelectedInventoryStatus = await Actions.session.SetInventory({
          id: fulfillmentCenter.selectedInventory.id,
        });

        if (saveSelectedInventoryStatus) window.location.reload();
      }
    };
    onChange();
  }, [changePreloader, fulfillmentCenter?.raw, fulfillmentCenter?.selectedInventory, setSelectedInventory]);

  return (
    <React.Fragment>
      {fulfillmentCenter?.options?.length && (
        <Modal isOpen={modalOpen} size="lg" className="overflow-visible">
          <div className="py-4 flex-col-start px-2 px-lg-5">
            <h4 className="pb-3 border-bottom w-100">{t('CHOOSE_ARIA')}</h4>
            <DropDown
              menuItems={fulfillmentCenter.options}
              headerClassName="bg-white text-primary border-primary p-2 w-100 flex-between"
              caret={false}
              className="w-100 "
            >
              <div className="d-flex align-items-center gap-1 font-15">
                <i className="fa-solid fa-chevron-down text-primary"></i>
                <p>{t('DEFAULT_SELECT')}</p>
                <Image src={location} alt={'location'} width={20} height={20} />
              </div>
            </DropDown>
          </div>
        </Modal>
      )}
      {fulfillmentCenter?.options?.length && selectedInventory && (
        <DropDown
          menuItems={fulfillmentCenter.options}
          headerClassName="bg-white text-primary border-primary p-2 fullfillment-button"
          caret={false}
        >
          {selectedInventory && (
            <div className="d-flex align-items-center gap-1 font-15">
              <i className="fa-solid fa-chevron-down text-primary d-none d-lg-block"></i>
              <p className="d-none d-lg-block text-nowrap">{selectedInventory.name}</p>
              <Image src={location} alt={'location'} width={20} height={20} />
            </div>
          )}
        </DropDown>
      )}
    </React.Fragment>
  );
};

export default FulfillmentMenu;
