import { createSlice } from '@reduxjs/toolkit';

import initialStateBeforeJSON from './initialState.json';

export interface Share {
  date: string;
  amountPurchased: number;
  price: number;
  amountSold: number;
}

interface SharesState {
  before: Array<Share>;
  after: Array<Share>;
}

const initialState: SharesState = {
  before: initialStateBeforeJSON,
  after: [],
};

const sharesSlice = createSlice({
  name: 'shares',
  initialState,
  reducers: {
    add(state) {
      state.before.push({
        // TODO: remove dummy data
        date: '2022-08-27',
        amountPurchased: 30,
        price: 81.67,
        amountSold: 0,
      });
    },
  },
});

export const actions = sharesSlice.actions;
export default sharesSlice.reducer;
