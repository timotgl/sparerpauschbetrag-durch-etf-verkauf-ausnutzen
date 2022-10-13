import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { actions } from '../../redux/prices/reducer';
import classNames from './Prices.module.css';
import { CURRENCY_DECIMAL_PLACES } from '../../constants';

const Prices = () => {
  const [t] = useTranslation();

  const currentBidPrice = useAppSelector(
    (state) => state.prices.currentBidPrice
  );
  const [rawValue, setRawValue] = useState(String(currentBidPrice));
  const dispatch = useAppDispatch();

  const changeValue = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const { value: changedRawValue } = changeEvent.currentTarget;
    setRawValue(changedRawValue);
    const parsedValue = parseFloat(changedRawValue.replace(',', '.'));
    dispatch(
      actions.setCurrentBidPrice(
        isNaN(parsedValue) || parsedValue < 0
          ? 0
          : Math.floor(parsedValue * 100) / 100
      )
    );
  };

  return (
    <div>
      <p>
        {t('prices.current_bid_price')}{' '}
        <input
          className={classNames.Input}
          type="text"
          value={rawValue}
          onChange={changeValue}
        />{' '}
        =&gt;{' '}
        <input
          className={cn(classNames.Input, classNames.ReadOnlyInput)}
          type="number"
          value={currentBidPrice.toFixed(CURRENCY_DECIMAL_PLACES)}
          readOnly
        />
      </p>
    </div>
  );
};

export default Prices;
