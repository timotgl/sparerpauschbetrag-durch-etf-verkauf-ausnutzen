import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';
import simulateSale from './shares/simulateSale';
import { Share } from './shares/reducer';

const TAX_RELEVANT_FACTOR = 0.7;

/*
 * Optimal amount of profit (in EUR) to be gained from sale
 */
export const selectOptimalProfit = (state: RootState): number =>
  state.taxes.taxFreeAmount / TAX_RELEVANT_FACTOR;

const selectCurrentBidPrice = (state: RootState): number =>
  state.prices.currentBidPrice;

const selectShares = (state: RootState): Array<Share> => state.shares.before;

export const selectSaleSimulation = createSelector(
  selectOptimalProfit,
  selectCurrentBidPrice,
  selectShares,
  simulateSale
);

export const optimalAmountSaleValue = (state: RootState) => {
  const { numSharesToSell } = selectSaleSimulation(state);
  return state.prices.currentBidPrice * numSharesToSell;
};
