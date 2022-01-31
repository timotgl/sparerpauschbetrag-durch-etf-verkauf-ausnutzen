import { createReducer } from '@reduxjs/toolkit';

const TAX_FREE_AMOUNT_SINGLE = 801;
const TAX_FREE_AMOUNT_DOUBLE = 1602;

interface TaxesState {
  taxFreeAmount: number;
}

const initialState: TaxesState = {
  taxFreeAmount: TAX_FREE_AMOUNT_SINGLE,
};

const taxesReducer = createReducer(initialState, (builder) => {
  builder.addCase('taxes/setTaxFreeAmount', (state, action) => {
    state.taxFreeAmount = TAX_FREE_AMOUNT_DOUBLE;
  });
});

export default taxesReducer;
