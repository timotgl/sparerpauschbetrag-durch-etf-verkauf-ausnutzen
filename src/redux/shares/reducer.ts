import { createSlice } from '@reduxjs/toolkit';

import initialStateBeforeJSON from './initialState.json';
console.log(initialStateBeforeJSON);

export interface Share {
  date: string;
  amount: number;
  price: number;
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
      state.before.push({ date: '2022-08-27', amount: 30, price: 81.67 });
    },
  },
});

export const actions = sharesSlice.actions;
export default sharesSlice.reducer;
