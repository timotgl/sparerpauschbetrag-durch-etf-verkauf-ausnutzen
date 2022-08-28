import React from 'react';
import cn from 'classnames';
import day from 'dayjs';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../redux/hooks';
import classNames from './Shares.module.css';

const SHARE_AMOUNT_DIGITS = 4;
const SHARE_PRICE_DIGITS = 2;

const Shares = () => {
  const [t] = useTranslation();
  const sharesBefore = useAppSelector((state) => state.shares.before);

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
            <td className={cn(classNames.RightAlignedCell)}>
              {t('shares.simulation_outcome')}
            </td>
          </tr>
        </thead>
        <tbody>
          {sharesBefore.map((share, index) => (
            <tr key={index}>
              <td>{day(share.date).format('YYYY-MM-DD')}</td>
              <td className={cn(classNames.RightAlignedCell)}>
                {share.price.toFixed(SHARE_PRICE_DIGITS)}
              </td>
              <td className={cn(classNames.RightAlignedCell)}>
                {share.amountPurchased.toFixed(SHARE_AMOUNT_DIGITS)}
              </td>
              <td className={cn(classNames.RightAlignedCell)}>
                {share.amountSold.toFixed(SHARE_AMOUNT_DIGITS)}
              </td>
              <td className={cn(classNames.RightAlignedCell)}>
                {(share.amountPurchased - share.amountSold).toFixed(
                  SHARE_AMOUNT_DIGITS
                )}
              </td>
              <td className={cn(classNames.RightAlignedCell)}>
                TODO: simulation_outcome
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shares;
