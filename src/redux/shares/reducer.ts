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
    replace(state, action) {
      state.before = action.payload;
    },
  },
});

export const actions = sharesSlice.actions;
export default sharesSlice.reducer;
