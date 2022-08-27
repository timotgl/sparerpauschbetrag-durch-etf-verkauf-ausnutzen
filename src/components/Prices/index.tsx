import React from 'react';

import { useAppSelector } from '../../redux/hooks';

const Prices = () => {
  const currentBidPrice = useAppSelector(
    (state) => state.prices.currentBidPrice
  );
  return (
    <div>
      <h2>Aktueller Preis: EUR {currentBidPrice.toFixed(2)}</h2>
    </div>
  );
};

export default Prices;
