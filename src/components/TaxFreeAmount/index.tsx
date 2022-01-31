import React from 'react';

import { useAppSelector } from '../../redux/hooks';

const TaxFreeAmount = () => {
  const amount = useAppSelector((state) => state.taxes.taxFreeAmount);
  return (
    <div>
      <h2>TaxFreeAmount</h2>
      <p>
        EUR &nbsp;
        <input type="number" value={amount} readOnly />
      </p>
    </div>
  );
};

export default TaxFreeAmount;
