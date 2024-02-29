'use client';
import React, { ReactNode, useState } from 'react';
import { Col, InputGroup, Row } from 'reactstrap';
import { ButtonMaker, IconLink, RadioCheck } from '@components';
import { Steps } from 'primereact/steps';
import { MenuItem } from 'primereact/menuitem';
import { Stepper } from '@components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import useTranslate from '../../../../hooks/useTranslate';
interface IFormStepper {
  children: ReactNode;
  buttons: ReactNode;
  stepper?: boolean;
  success?:ReactNode;
}
const FormStepper = (props: IFormStepper) => {
  const { children, buttons, stepper = true } = props;
  const t = useTranslate('COMP_StepForm');
  const [active, setActive] = useState({ index: 0, values: [{}] });
  const groups = React.Children.toArray(children);
  const stepperSchema = Yup.object().shape({});
  return (
    <div className="flex-col-start">
      {stepper && (
        <Row className="w-100 ">
          {/* <Col className="col-12 mb-3">
          <IconLink
            text={t('BACK')}
            textColor="black"
            as="button"
            className="flex-row-reverse border-gray"
            icon="caret"
            iconColor="black"
            iconDirection="left"
            onClick={() =>
              setActive(prev => {
                return {
                  ...prev,
                  index: prev.index > 0 ? prev.index - 1 : prev.index,
                };
              })
            }
          />
        </Col> */}
          <Col className="col-12">
            <Stepper numOfSteps={groups.length} className="pb-4" active={active.index} />
          </Col>
        </Row>
      )}
      <Formik
        initialValues={{}}
        onSubmit={values => {
          setActive(prev => {
            return {
              ...prev,
              index: prev.index !== groups.length - 1 ? prev.index + 1 : prev.index,
            };
          });
        }}
        onReset={() =>
          setActive(prev => {
            return {
              ...prev,
              index: prev.index > 0 ? prev.index - 1 : prev.index,
            };
          })
        }
        validationSchema={stepperSchema}
      >
        <Form className="w-100">
          <Row>
            <div className="px-0 py-3">{groups[active.index]}</div>
            <Col>{buttons}</Col>
          </Row>
        </Form>
      </Formik>
    </div>
  );
};

export default FormStepper;
