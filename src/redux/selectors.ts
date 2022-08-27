import { RootState } from './store';

const TAX_RELEVANT_FACTOR = 0.7;

export const getOptimalProfit = (state: RootState) =>
  state.taxes.taxFreeAmount / TAX_RELEVANT_FACTOR;

export const sumSharesBeforeSale = (state: RootState) =>
  state.shares.before.reduce((sum, share) => sum + share.amount, 0);

export const totalSaleValueSharesBefore = (state: RootState) =>
  state.shares.before.reduce((totalValue, share) => {
    return totalValue + share.amount * state.prices.currentBidPrice;
  }, 0);

export const optimalAmountOfSharesToSell = (state: RootState) => {
  // Optimal amount of profit (in EUR) to be gained from ETF sale
  const optimalProfit = getOptimalProfit(state);

  // Sale price (bid) of one share of the ETF in EUR
  const bidPrice = state.prices.currentBidPrice;

  // Amount of shares I own in chronologically ascending order.
  // (first element = oldest shares)
  const shares = state.shares.before.map((share) => [
    share.amount,
    share.price,
  ]);

  let fractionedSharesWarning = 'None of the positions will be fractioned.';

  const simulateSale = (numSharesSold: number) => {
    // Iterate through elements of shares array
    let sharesIndex = 0;

    // Total profit (in EUR) earned when numSharesSold is sold at bidPrice.
    let totalProfit = 0;

    // Keep track of how many shares (starting with numSharesSold) we still have to sell.
    let sharesSold = numSharesSold;

    while (sharesSold > 0 && sharesIndex < shares.length) {
      //console.log('--------------------------------------------------------------------');
      //console.log('Shares left to sell:', sharesSold);

      const [originalAmount, originalPrice] = shares[sharesIndex];
      let amount = originalAmount;

      if (amount > sharesSold) {
        // The position is bigger than the number of shares we still need to sell
        fractionedSharesWarning =
          `Warning: The position with ${amount} ` +
          `shares bought at ${originalPrice} ` +
          `EUR will be reduced to ${Number(
            (amount - sharesSold).toFixed(3)
          )} shares.\n` +
          'Following FIFO, your next sale will start with this position.';
        amount = sharesSold;
      }

      const profit = Number(
        (amount * bidPrice - amount * originalPrice).toFixed(2)
      );

      /*
      console.log(
          'Selling', amount,
          'ETF shares at', bidPrice,
          'EUR per share results in a profit of', profit,
          'EUR'
      );
      */

      totalProfit += profit;
      sharesSold -= amount;
      sharesIndex += 1;
    }

    totalProfit = Number(totalProfit.toFixed(2));
    //console.log('--------------------------------------------------------------------');
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
  let profit = 0;
  while (true) {
    numSharesToSell += 1;
    profit = simulateSale(numSharesToSell);
    if (profit >= optimalProfit) {
      numSharesToSell -= 1;
      profit = simulateSale(numSharesToSell);
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

  return numSharesToSell;
};
