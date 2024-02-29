'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { Input } from 'reactstrap';
interface ICounterProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  carets?: boolean;
  id?: string;
}
const Counter = (props: ICounterProps) => {
  const { count, setCount, carets, id = 'counter' } = props;
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <div className="rounded-2 border py-2 px-2 flex-between ">
      {carets ? (
        <div className="icons flex-col justify-content-center me-2">
          <i
            className="fa-solid fa-caret-up text-muted font-15"
            style={{ lineHeight: '0.6', cursor: 'pointer' }}
            onClick={handleIncrement}
          ></i>
          <i
            className="fa-solid fa-caret-down text-muted font-15"
            style={{ lineHeight: '0.6', cursor: 'pointer' }}
            onClick={handleDecrement}
          ></i>
          <Input className="font-12 border-0 p-0 text-center" name="counter" id={id} type="number" value={count} />
        </div>
      ) : (
        <div className="flex-between gap-2 py-1">
          <i
            className="fa-solid fa-minus text-muted font-15 text-dimmed border-end pe-2 m-0 pointer"
            onClick={handleDecrement}
          ></i>
          <Input
            className="font-12 border-0 p-0 text-center"
            type="number"
            name="counter"
            id={id}
            value={count}
            onChange={e => {
              setCount(e.target.valueAsNumber);
            }}
          />
          <i
            className="fa-solid fa-plus text-muted font-15 text-dimmed border-start ps-2 pointer"
            onClick={handleIncrement}
          ></i>
        </div>
      )}
    </div>
  );
};

export default Counter;
