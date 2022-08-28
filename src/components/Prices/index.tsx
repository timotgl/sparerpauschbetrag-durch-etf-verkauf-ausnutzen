import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../redux/hooks';
import classNames from './Prices.module.css';

const Prices = () => {
  const [t] = useTranslation();
  const currentBidPrice = useAppSelector(
    (state) => state.prices.currentBidPrice
  );
  return (
    <div>
      <p>
        {t('prices.current_bid_price')}{' '}
        <input
          className={classNames.Input}
          type="text"
          value={currentBidPrice.toFixed(2)}
          readOnly
        />
      </p>
    </div>
  );
};

export default Prices;
