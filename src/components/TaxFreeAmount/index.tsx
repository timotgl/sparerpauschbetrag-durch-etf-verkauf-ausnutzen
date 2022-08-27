import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  TAX_FREE_AMOUNT_SINGLE,
  TAX_FREE_AMOUNT_DOUBLE,
  actions,
} from '../../redux/taxes/reducer';
import classNames from './TaxFreeAmount.module.css';

const currentYear = new Date().getFullYear();
const isValid = (changedValue: number) =>
  changedValue >= 0 && changedValue <= TAX_FREE_AMOUNT_DOUBLE;

const TaxFreeAmount = () => {
  const { t } = useTranslation();

  const defaultValues = [
    {
      value: TAX_FREE_AMOUNT_SINGLE,
      label: t('taxes.tax_free_amount.default_values.single'),
    },
    {
      value: TAX_FREE_AMOUNT_DOUBLE,
      label: t('taxes.tax_free_amount.default_values.double'),
    },
  ];

  const amount = useAppSelector((state) => state.taxes.taxFreeAmount);
  const dispatch = useAppDispatch();
  const changeValue = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const changedValue = parseInt(changeEvent.currentTarget.value, 10);
    if (isValid(changedValue)) {
      dispatch(actions.set(changeEvent.currentTarget.value));
    }
  };
  return (
    <div>
      <p>
        {t('taxes.tax_free_amount.remaining_amount', { currentYear })}&nbsp;
        <input
          className={classNames.Input}
          type="number"
          value={amount}
          onChange={changeValue}
        />
      </p>
      <p className={classNames.ResetButtonContainer}>
        {t('taxes.tax_free_amount.reset')}&nbsp;
        {defaultValues.map(({ value, label }) => (
          <button
            key={value}
            className={classNames.ResetButton}
            onClick={() =>
              changeValue({
                currentTarget: { value: String(value) },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            EUR {value} ({label})
          </button>
        ))}
        &nbsp;{' '}
        <a href="https://de.wikipedia.org/wiki/Sparer-Pauschbetrag">
          {t('taxes.tax_free_amount.definition_link_caption')}
        </a>
      </p>
    </div>
  );
};

export default TaxFreeAmount;
