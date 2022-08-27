import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import pricesReducer from './prices/reducer';
import sharesReducer from './shares/reducer';
import taxesReducer from './taxes/reducer';

export const store = configureStore({
  reducer: {
    prices: pricesReducer,
    shares: sharesReducer,
    taxes: taxesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
