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
  let fractionedSharesWarning = 'None of the positions will be fractioned.';

  const shares = sharesRaw.map((share) => [
    share.amountPurchased - share.amountSold,
    share.price,
  ]);
  const numShares = shares.reduce((num, share) => num + share[0], 0);
  console.log('numShares:', numShares);

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
      //console.log('Shares left to sell:', sharesSold);

      const [originalAmount, originalPrice] = shares[sharesIndex];
      let amount = originalAmount;

      if (amount > sharesSold) {
        // The position is bigger than the number of shares we still need to sell
        fractionedSharesWarning =
          `Warning: The position with ${amount} ` +
          `shares bought at ${originalPrice} ` +
          `EUR will be reduced to ${Number(
            (amount - sharesSold).toFixed(SHARE_DECIMAL_PLACES)
          )} shares.\n` +
          'Following FIFO, your next sale will start with this position.';
        amount = sharesSold;
      }

      const profit = Number(
        (amount * bidPrice - amount * originalPrice).toFixed(
          CURRENCY_DECIMAL_PLACES
        )
      );
      const outcomeMessage =
        profit > 0
          ? `${amount.toFixed(
              SHARE_DECIMAL_PLACES
            )} shares sold with a profit of EUR ${profit}. ${(
              originalAmount - amount
            ).toFixed(SHARE_DECIMAL_PLACES)} shares are left.`
          : '';
      outcomes.push(outcomeMessage);

      totalProfit += profit;
      sharesSold -= amount;
      sharesIndex += 1;
    }

    totalProfit = Number(totalProfit.toFixed(CURRENCY_DECIMAL_PLACES));
    /*
    console.log(
        'Total profit:', totalProfit,
        'EUR for', numSharesSold,
        'shares sold. Total sale value:', Number((numSharesSold * bidPrice).toFixed(2))
    );
    */

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

  console.log(
    'You should sell',
    numSharesToSell,
    'shares to approximate but not exceed the optimal profit of',
    optimalProfit,
    'EUR with',
    profit,
    'EUR.'
  );

  console.log(fractionedSharesWarning);

  return {
    numSharesToSell,
    actualProfit: profit,
    fractionedSharesWarning,
    outcomes,
  };
};

export default simulateSale;
