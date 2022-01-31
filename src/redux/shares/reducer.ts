import { createReducer } from '@reduxjs/toolkit';

interface Share {
  amount: number;
  price: number;
}

interface SharesState {
  before: Array<Share>;
  after: Array<Share>;
}

const initialState: SharesState = {
  before: [
    { amount: 30.0, price: 81.67 },
    { amount: 6.147, price: 81.34 },
    { amount: 119.0, price: 83.99 },
  ],
  after: [],
};

const sharesReducer = createReducer(initialState, (builder) => {
  builder.addCase('shares/add', (state, action) => {
    state.before.push({ amount: 30, price: 81.67 });
  });
});

export default sharesReducer;
