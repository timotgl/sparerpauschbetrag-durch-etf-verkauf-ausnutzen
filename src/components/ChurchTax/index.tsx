import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { actions } from '../../redux/taxes/reducer';
import {
  CHURCH_TAX_RATE_BAVARIA,
  CHURCH_TAX_RATE_OTHER,
} from '../../constants';
import classNames from './ChurchTax.module.css';

const ChurchTax = () => {
  const { t } = useTranslation();

  const rate = useAppSelector((state) => state.taxes.churchTaxRate);
  const dispatch = useAppDispatch();

  const changeValue = (changeEvent: React.ChangeEvent<HTMLSelectElement>) => {
    const changedValue = parseFloat(changeEvent.target.value);
    dispatch(actions.setChurchTaxRate(changedValue));
  };

  return (
    <div>
      <p>
        <label>
          {t('taxes.church_tax.label')}{' '}
          <select
            className={classNames.Select}
            value={rate}
            onChange={changeValue}
          >
            <option value="0">{t('taxes.church_tax.none')}</option>
            <option value={CHURCH_TAX_RATE_OTHER}>
              {CHURCH_TAX_RATE_OTHER * 100}% ({t('taxes.church_tax.other')})
            </option>
            <option value={CHURCH_TAX_RATE_BAVARIA}>
              {CHURCH_TAX_RATE_BAVARIA * 100}% ({t('taxes.church_tax.bavaria')})
            </option>
          </select>
        </label>
      </p>
    </div>
  );
};

export default ChurchTax;
