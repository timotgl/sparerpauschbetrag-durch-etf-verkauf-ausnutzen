import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';
import simulateSale from './shares/simulateSale';
import { Share } from './shares/reducer';
import { STOCKS_TAX_EXEMPTION_FACTOR } from '../constants';

export const selectTaxFreeAmount = (state: RootState): number =>
  state.taxes.taxFreeAmount;

/*
 * Optimal amount of profit (in EUR) to be gained from sale
 */
export const selectOptimalProfit = (state: RootState): number =>
  state.taxes.taxFreeAmount / STOCKS_TAX_EXEMPTION_FACTOR;

export const selectCurrentBidPrice = (state: RootState): number =>
  state.prices.currentBidPrice;

const selectShares = (state: RootState): Array<Share> => state.shares.before;

const isShareProfitable = (share: Share, currentBidPrice: number): boolean =>
  currentBidPrice > share.price;

/*
 * Filter for consecutive, profitable shares starting with the first element of
 * the array. If the first (oldest) share isn't profitable, an empty array is
 * returned.
 */
const filterConsecutiveProfitableShares = (
  currentBidPrice: number,
  shares: Array<Share>
): Array<Share> => {
  let indexOfLastConsecutiveProfitableShare = -1;
  let currentShare: Share;

  for (let index = 0; index < shares.length; index += 1) {
    currentShare = shares[index];
    if (isShareProfitable(currentShare, currentBidPrice)) {
      indexOfLastConsecutiveProfitableShare = index;
    } else {
      // the "streak" ends as soon as we encounter an unprofitable share
      // that would result in a loss instead of a profit when selling it.
      break;
    }
  }

  return shares.slice(0, indexOfLastConsecutiveProfitableShare + 1);
};
const selectProfitableShares = createSelector(
  selectCurrentBidPrice,
  selectShares,
  filterConsecutiveProfitableShares
);

export const selectSaleSimulation = createSelector(
  selectOptimalProfit,
  selectCurrentBidPrice,
  selectProfitableShares,
  simulateSale
);

export const optimalAmountSaleValue = (state: RootState) => {
  const { numSharesToSell } = selectSaleSimulation(state);
  return state.prices.currentBidPrice * numSharesToSell;
};
