import { createSlice } from '@reduxjs/toolkit';

import { TAX_FREE_AMOUNT_SINGLE } from '../../constants';

interface TaxesState {
  taxFreeAmount: number;
  churchTaxRate: number;
}

const initialState: TaxesState = {
  taxFreeAmount: TAX_FREE_AMOUNT_SINGLE,
  churchTaxRate: 0,
};

const taxesSlice = createSlice({
  name: 'taxes',
  initialState,
  reducers: {
    setTaxFreeAmount(state, action) {
      state.taxFreeAmount = action.payload;
    },
    setChurchTaxRate(state, action) {
      state.churchTaxRate = action.payload;
    },
  },
});

export const actions = taxesSlice.actions;
export default taxesSlice.reducer;
