import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../redux/hooks';
import {
  selectOptimalProfit,
  selectSaleSimulation,
  optimalAmountSaleValue,
  selectTaxFreeAmount,
} from '../../redux/selectors';
import {
  CURRENCY_DECIMAL_PLACES,
  STOCKS_TAX_EXEMPTION_FACTOR,
} from '../../constants';
import { taxCapitalYields } from '../../utils';
import classNames from './SaleSimulation.module.css';

const SaleSimulation = () => {
  const [t] = useTranslation();
  const taxFreeAmount = useAppSelector(selectTaxFreeAmount);
  const churchTaxRate = useAppSelector((state) => state.taxes.churchTaxRate);
  const optimalProfit = useAppSelector(selectOptimalProfit);
  const saleSimulationResult = useAppSelector(selectSaleSimulation);
  const saleValue = useAppSelector(optimalAmountSaleValue);
  const taxFreeAmountExhausted =
    saleSimulationResult.actualProfit * STOCKS_TAX_EXEMPTION_FACTOR;
  return (
    <div>
      <h2>{t('sale_simulation.heading')}</h2>
      <p>
        {t('sale_simulation.optimal_profit')} EUR{' '}
        {optimalProfit.toFixed(CURRENCY_DECIMAL_PLACES)}
      </p>
      <div className={classNames.OptimalAmount}>
        <p>
          <strong>
            {t('sale_simulation.optimal_amount_shares')}{' '}
            {saleSimulationResult.numSharesToSell}
          </strong>
        </p>
        <p className={classNames.Warning}>
          {saleSimulationResult.fractionedSharesWarning}
        </p>
      </div>
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
      <p>
        {t('sale_simulation.tax_free_amount.exhausted')} EUR{' '}
        {(
          saleSimulationResult.actualProfit * STOCKS_TAX_EXEMPTION_FACTOR
        ).toFixed(CURRENCY_DECIMAL_PLACES)}
      </p>
      <p>
        {t('sale_simulation.tax_free_amount.remaining')} EUR{' '}
        {(
          taxFreeAmount -
          saleSimulationResult.actualProfit * STOCKS_TAX_EXEMPTION_FACTOR
        ).toFixed(CURRENCY_DECIMAL_PLACES)}
      </p>
      <p>
        {t('sale_simulation.taxes_saved')} EUR{' '}
        {taxCapitalYields(taxFreeAmountExhausted, churchTaxRate).toFixed(
          CURRENCY_DECIMAL_PLACES
        )}
        <br />
        <small>{t('sale_simulation.taxes_saved_disclaimer')}</small>
      </p>
    </div>
  );
};

export default SaleSimulation;
