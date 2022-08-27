import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../redux/hooks';
import {
  getOptimalProfit,
  optimalAmountOfSharesToSell,
} from '../../redux/selectors';

const SaleSimulation = () => {
  const [t] = useTranslation();
  const optimalProfit = useAppSelector(getOptimalProfit);
  const optimalAmount = useAppSelector(optimalAmountOfSharesToSell);
  return (
    <div>
      <h2>{t('sale_simulation.heading')}</h2>
      <p>{t('sale_simulation.optimal_profit')} EUR {optimalProfit.toFixed(2)}</p>
      <p>{t('sale_simulation.optimal_amount_shares')} {optimalAmount}</p>
    </div>
  );
};

export default SaleSimulation;
