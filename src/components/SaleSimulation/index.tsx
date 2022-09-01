import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../redux/hooks';
import {
  selectOptimalProfit,
  selectSaleSimulation,
  optimalAmountSaleValue,
} from '../../redux/selectors';
import { CURRENCY_DECIMAL_PLACES } from '../../constants';

const SaleSimulation = () => {
  const [t] = useTranslation();
  const optimalProfit = useAppSelector(selectOptimalProfit);
  const saleSimulationResult = useAppSelector(selectSaleSimulation);
  const saleValue = useAppSelector(optimalAmountSaleValue);
  return (
    <div>
      <h2>{t('sale_simulation.heading')}</h2>
      <p>
        {t('sale_simulation.optimal_profit')} EUR{' '}
        {optimalProfit.toFixed(CURRENCY_DECIMAL_PLACES)}
      </p>
      <p>
        <strong>
          {t('sale_simulation.optimal_amount_shares')}{' '}
          {saleSimulationResult.numSharesToSell}
        </strong>
      </p>
      <p>
        {t('sale_simulation.sale_value')} EUR{' '}
        {saleValue.toFixed(CURRENCY_DECIMAL_PLACES)}
      </p>
      <p>
        {t('sale_simulation.actual_profit')} EUR{' '}
        {saleSimulationResult.actualProfit.toFixed(CURRENCY_DECIMAL_PLACES)}
      </p>
      <p>
        {t('sale_simulation.difference_to_optimal')} EUR{' '}
        {(optimalProfit - saleSimulationResult.actualProfit).toFixed(
          CURRENCY_DECIMAL_PLACES
        )}
      </p>
    </div>
  );
};

export default SaleSimulation;
