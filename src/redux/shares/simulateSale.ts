import i18next from 'i18next';

import { Share } from './reducer';
import { SHARE_DECIMAL_PLACES, CURRENCY_DECIMAL_PLACES } from '../../constants';

export interface SaleSimulationResult {
  numSharesToSell: number;
  actualProfit: number;
  fractionedSharesWarning: string;
  outcomes: Array<string>;
}

const simulateSale = (
  optimalProfit: number,
  bidPrice: number,
  sharesRaw: Array<Share>
): SaleSimulationResult => {
  const { t } = i18next;
  let fractionedSharesWarning = t('sale_simulation.no_fractions');

  const shares = sharesRaw.map((share) => [
    share.amountPurchased - share.amountSold,
    share.price,
  ]);
  const numShares = shares.reduce((num, share) => num + share[0], 0);
  let outcomes: Array<string> = [];

  const simulateIncrementalSale = (numSharesSold: number) => {
    // Iterate through elements of shares array
    let sharesIndex = 0;
    outcomes = [];

    // Total profit (in EUR) earned when numSharesSold is sold at bidPrice.
    let totalProfit = 0;

    // Keep track of how many shares (starting with numSharesSold) we still have to sell.
    let sharesSold = numSharesSold;

    while (sharesSold > 0 && sharesIndex < shares.length) {
      const [originalAmount, originalPrice] = shares[sharesIndex];
      let amount = originalAmount;

      if (amount > sharesSold) {
        // The position is bigger than the number of shares we still need to sell
        fractionedSharesWarning = t(
          'sale_simulation.fractioned_shares_warning',
          {
            amount,
            originalPrice: originalPrice.toFixed(CURRENCY_DECIMAL_PLACES),
            purchaseDate: sharesRaw[sharesIndex].date,
            reducedAmount: Number(
              (amount - sharesSold).toFixed(SHARE_DECIMAL_PLACES)
            ),
          }
        );
        amount = sharesSold;
      }

      const profit = Number(
        (amount * bidPrice - amount * originalPrice).toFixed(
          CURRENCY_DECIMAL_PLACES
        )
      );
      const outcomeMessage = t('sale_simulation.outcome_message', {
        amount: amount.toFixed(SHARE_DECIMAL_PLACES),
        profit: profit.toFixed(CURRENCY_DECIMAL_PLACES),
        reducedAmount: (originalAmount - amount).toFixed(SHARE_DECIMAL_PLACES),
      });
      outcomes.push(outcomeMessage);

      totalProfit += profit;
      sharesSold -= amount;
      sharesIndex += 1;
    }

    totalProfit = Number(totalProfit.toFixed(CURRENCY_DECIMAL_PLACES));

    return totalProfit;
  };

  let numSharesToSell = 0;
  const numSharesSellable = Math.floor(numShares);
  let profit = 0;
  while (numSharesToSell < numSharesSellable) {
    numSharesToSell += 1;
    profit = simulateIncrementalSale(numSharesToSell);
    if (profit >= optimalProfit) {
      numSharesToSell -= 1;
      profit = simulateIncrementalSale(numSharesToSell);
      break;
    }
  }

  return {
    numSharesToSell,
    actualProfit: profit,
    fractionedSharesWarning,
    outcomes,
  };
};

export default simulateSale;
