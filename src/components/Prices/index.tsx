import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../redux/hooks';

const Prices = () => {
  const [t] = useTranslation();
  const currentBidPrice = useAppSelector(
    (state) => state.prices.currentBidPrice
  );
  return (
    <div>
      <h2>
        {t('prices.current_bid_price')} EUR {currentBidPrice.toFixed(2)}
      </h2>
    </div>
  );
};

export default Prices;
