import React from 'react';
import cn from 'classnames';
import day from 'dayjs';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../redux/hooks';
import { Share } from '../../redux/shares/reducer';
import {
  sumSharesBeforeSale,
  totalSaleValueSharesBefore,
} from '../../redux/selectors';
import classNames from './Shares.module.css';

const SHARE_AMOUNT_DIGITS = 4;
const SHARE_PRICE_DIGITS = 2;

const Shares = () => {
  const [t] = useTranslation();
  const sharesBefore = useAppSelector((state) => state.shares.before);
  const sumShares = useAppSelector(sumSharesBeforeSale);
  const totalValue = useAppSelector(totalSaleValueSharesBefore);
  const currentBidPrice = useAppSelector(
    (state) => state.prices.currentBidPrice
  );
  const calculateGain = (share: Share): number =>
    share.amountPurchased * currentBidPrice - share.amountPurchased * share.price;

  return (
    <div>
      <h2>{t('shares.heading')}</h2>
      <h3>
        {t('shares.before_sale')} {sumShares.toFixed(SHARE_AMOUNT_DIGITS)}{' '}
        {t('shares.total_value')} EUR {totalValue.toFixed(SHARE_PRICE_DIGITS)}
      </h3>
      <table className={classNames.Table}>
        <thead>
          <tr>
            <td>{t('shares.trade_date')}</td>
            <td className={cn(classNames.RightAlignedCell)}>
              {t('shares.amount_purchased')}
            </td>
            <td className={cn(classNames.RightAlignedCell)}>
              {t('shares.execution_rate')} EUR
            </td>
            <td className={cn(classNames.RightAlignedCell)}>
              {t('shares.amount_sold')}
            </td>
            <td className={cn(classNames.RightAlignedCell)}>
              {t('shares.sale_profit')} EUR
            </td>
          </tr>
        </thead>
        <tbody>
          {sharesBefore.map((share, index) => (
            <tr key={index}>
              <td>{day(share.date).format('YYYY-MM-DD')}</td>
              <td className={cn(classNames.RightAlignedCell)}>
                {share.amountPurchased.toFixed(SHARE_AMOUNT_DIGITS)}
              </td>
              <td className={cn(classNames.RightAlignedCell)}>
                {share.price.toFixed(SHARE_PRICE_DIGITS)}
              </td>
              <td className={cn(classNames.RightAlignedCell)}>
                {/* {share.amount.toFixed(SHARE_AMOUNT_DIGITS)} */}amount sold
              </td>
              <td className={cn(classNames.RightAlignedCell)}>
                {calculateGain(share).toFixed(SHARE_PRICE_DIGITS)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shares;
