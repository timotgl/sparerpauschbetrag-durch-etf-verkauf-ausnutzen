import React from 'react';
import cn from 'classnames';
import day from 'dayjs';

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
  const sharesBefore = useAppSelector((state) => state.shares.before);
  const sumShares = useAppSelector(sumSharesBeforeSale);
  const totalValue = useAppSelector(totalSaleValueSharesBefore);
  const currentBidPrice = useAppSelector(
    (state) => state.prices.currentBidPrice
  );
  const calculateGain = (share: Share): number =>
    share.amount * currentBidPrice - share.amount * share.price;

  return (
    <div>
      <h2>Anteile im Depot</h2>
      <h3>
        Vor Verkauf: {sumShares.toFixed(SHARE_AMOUNT_DIGITS)} Anteile im Wert
        von EUR {totalValue.toFixed(SHARE_PRICE_DIGITS)}
      </h3>
      <table className={classNames.Table}>
        <thead>
          <tr>
            <td>Schlusstag</td>
            <td className={cn(classNames.RightAlignedCell)}>Anzahl Anteile</td>
            <td className={cn(classNames.RightAlignedCell)}>
              Ausführungskurs EUR
            </td>
            <td className={cn(classNames.RightAlignedCell)}>
              Verkaufsgewinn EUR
            </td>
          </tr>
        </thead>
        <tbody>
          {sharesBefore.map((share, index) => (
            <tr key={index}>
              <td>{day(share.date).format('YYYY-MM-DD')}</td>
              <td className={cn(classNames.RightAlignedCell)}>
                {share.amount.toFixed(SHARE_AMOUNT_DIGITS)}
              </td>
              <td className={cn(classNames.RightAlignedCell)}>
                {share.price.toFixed(SHARE_PRICE_DIGITS)}
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
