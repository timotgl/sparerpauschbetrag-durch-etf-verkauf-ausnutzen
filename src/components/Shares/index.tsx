import React from 'react';
import cn from 'classnames';
import day from 'dayjs';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../redux/hooks';
import {
  selectSaleSimulation,
  selectCurrentBidPrice,
} from '../../redux/selectors';
import { SHARE_DECIMAL_PLACES, CURRENCY_DECIMAL_PLACES } from '../../constants';
import classNames from './Shares.module.css';

const Shares = () => {
  const [t] = useTranslation();
  const sharesBefore = useAppSelector((state) => state.shares.before);
  const currentBidPrice = useAppSelector(selectCurrentBidPrice);
  const saleSimulation = useAppSelector(selectSaleSimulation);

  return (
    <div>
      <h2>{t('shares.heading')}</h2>
      <table className={classNames.Table}>
        <thead>
          <tr>
            <td>{t('shares.trade_date')}</td>
            <td className={cn(classNames.RightAlignedCell)}>
              {t('shares.execution_rate')} EUR
            </td>
            <td className={cn(classNames.RightAlignedCell)}>
              {t('shares.amount_purchased')}
            </td>
            <td className={cn(classNames.RightAlignedCell)}>
              {t('shares.amount_sold')}
            </td>
            <td className={cn(classNames.RightAlignedCell)}>
              {t('shares.amount_left')}
            </td>
            <td>{t('shares.simulation_outcome')}</td>
          </tr>
        </thead>
        <tbody>
          {sharesBefore.map((share, index) => (
            <tr
              key={index}
              className={cn({
                [classNames.FullySoldShareRow]:
                  share.amountPurchased - share.amountSold === 0,
              })}
            >
              <td>{day(share.date).format('YYYY-MM-DD')}</td>
              <td
                className={cn(classNames.RightAlignedCell, {
                  [classNames.ProfitableShareCell]:
                    currentBidPrice > share.price,
                  [classNames.UnprofitableShareCell]:
                    currentBidPrice <= share.price,
                })}
              >
                {share.price.toFixed(CURRENCY_DECIMAL_PLACES)}
              </td>
              <td className={cn(classNames.RightAlignedCell)}>
                {share.amountPurchased.toFixed(SHARE_DECIMAL_PLACES)}
              </td>
              <td className={cn(classNames.RightAlignedCell)}>
                {share.amountSold.toFixed(SHARE_DECIMAL_PLACES)}
              </td>
              <td className={cn(classNames.RightAlignedCell)}>
                {(share.amountPurchased - share.amountSold).toFixed(
                  SHARE_DECIMAL_PLACES
                )}
              </td>
              <td className={cn(classNames.OutcomeCell)}>
                {saleSimulation.outcomes[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shares;
