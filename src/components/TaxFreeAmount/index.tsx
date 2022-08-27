import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  TAX_FREE_AMOUNT_SINGLE,
  TAX_FREE_AMOUNT_DOUBLE,
  actions,
} from '../../redux/taxes/reducer';
import classNames from './TaxFreeAmount.module.css';

const defaultValues = [
  {
    value: TAX_FREE_AMOUNT_SINGLE,
    label: 'Einzelveranlagung/Single',
  },
  {
    value: TAX_FREE_AMOUNT_DOUBLE,
    label: 'Zusammenveranlagte Personen',
  },
];

const currentYear = new Date().getFullYear();
const isValid = (changedValue: number) =>
  changedValue >= 0 && changedValue <= TAX_FREE_AMOUNT_DOUBLE;

const TaxFreeAmount = () => {
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
        Verbleibender Steuerfreibetrag für {currentYear} in EUR:&nbsp;
        <input
          className={classNames.Input}
          type="number"
          value={amount}
          onChange={changeValue}
        />
      </p>
      <p className={classNames.ResetButtonContainer}>
        Zurücksetzen auf:&nbsp;
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
          Definition auf Wikipedia
        </a>
      </p>
    </div>
  );
};

export default TaxFreeAmount;
