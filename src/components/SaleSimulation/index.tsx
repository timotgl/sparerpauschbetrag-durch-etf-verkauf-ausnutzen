import React from 'react';

import { useAppSelector } from '../../redux/hooks';
import {
  getOptimalProfit,
  optimalAmountOfSharesToSell,
} from '../../redux/selectors';
import { Share } from '../../redux/shares/reducer';

const SaleSimulation = () => {
  const optimalProfit = useAppSelector(getOptimalProfit);
  const optimalAmount = useAppSelector(optimalAmountOfSharesToSell);
  return (
    <div>
      <h2>Simulation Verkauf</h2>
      <p>Zu erzielender Gewinn: EUR {optimalProfit.toFixed(2)}</p>
      <p>Optimale Anzahl zu verkaufende Anteile: {optimalAmount}</p>
    </div>
  );
};

export default SaleSimulation;
