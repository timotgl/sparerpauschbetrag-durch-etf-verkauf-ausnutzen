import { createSlice } from '@reduxjs/toolkit';

export const TAX_FREE_AMOUNT_SINGLE = 801;
export const TAX_FREE_AMOUNT_DOUBLE = 1602;

interface TaxesState {
  taxFreeAmount: number;
}

const initialState: TaxesState = {
  taxFreeAmount: TAX_FREE_AMOUNT_SINGLE,
};

const taxesSlice = createSlice({
  name: 'taxes',
  initialState,
  reducers: {
    set(state, action) {
      state.taxFreeAmount = action.payload;
    },
    resetSingle(state) {
      state.taxFreeAmount = TAX_FREE_AMOUNT_SINGLE;
    },
    resetDouble(state) {
      state.taxFreeAmount = TAX_FREE_AMOUNT_DOUBLE
    }
  }
});

export const actions = taxesSlice.actions
export default taxesSlice.reducer
