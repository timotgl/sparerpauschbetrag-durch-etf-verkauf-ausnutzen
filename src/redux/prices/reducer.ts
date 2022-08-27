import { createSlice } from '@reduxjs/toolkit';

export const DEFAULT_BID_PRICE = 99.56;

interface PricesState {
  currentBidPrice: number;
}

const initialState: PricesState = {
  currentBidPrice: DEFAULT_BID_PRICE,
};

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    setCurrentBidPrice(state, action) {
      state.currentBidPrice = action.payload;
    },
  }
});

export const actions = pricesSlice.actions
export default pricesSlice.reducer
