import React from 'react';

import { useAppSelector } from '../../redux/hooks';

const SHARE_AMOUNT_DIGITS = 4;
const SHARE_PRICE_DIGITS = 2;

const Shares = () => {
  const shares = useAppSelector((state) => state.shares.before);

  return (
    <div>
      <h2>Shares</h2>
      <table>
        <thead>
          <tr>
            <td>Amount</td>
            <td>Price EUR</td>
          </tr>
        </thead>
        <tbody>
          {shares.map((share, index) => (
            <tr key={index}>
              <td>{share.amount.toFixed(SHARE_AMOUNT_DIGITS)}</td>
              <td>{share.price.toFixed(SHARE_PRICE_DIGITS)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shares;
