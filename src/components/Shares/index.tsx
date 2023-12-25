import React, { ChangeEvent } from 'react';
import cn from 'classnames';
import day from 'dayjs';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectSaleSimulation,
  selectCurrentBidPrice,
} from '../../redux/selectors';
import { actions } from '../../redux/shares/reducer';
import { SHARE_DECIMAL_PLACES, CURRENCY_DECIMAL_PLACES } from '../../constants';
import classNames from './Shares.module.css';
import { readFileAsText, readSharesFromCsvString } from '../../utils';

const Shares = () => {
  const [t] = useTranslation();
  const sharesBefore = useAppSelector((state) => state.shares.before);
  const currentBidPrice = useAppSelector(selectCurrentBidPrice);
  const saleSimulation = useAppSelector(selectSaleSimulation);
  const dispatch = useAppDispatch();

  const importCsvFile = async (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const { files } = changeEvent.target;
    if (!files || files.length !== 1) {
      alert(t('shares.errors.import_only_one_file'));
      return;
    }
    const csv = await readFileAsText(files[0]);
    const parsedShares = readSharesFromCsvString(csv);
    dispatch(actions.replace(parsedShares));
  };

  return (
    <div>
      <h2>
        {t('shares.heading')}&nbsp;
        <label className={classNames.ImportCsv}>
          {t('shares.import_file_button_label')}:&nbsp;
          <input
            type="file"
            onChange={importCsvFile}
            className={classNames.ImportCsvButton}
          />
        </label>
      </h2>
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
