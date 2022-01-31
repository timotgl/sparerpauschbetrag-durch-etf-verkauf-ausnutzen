import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import taxesReducer from './taxes/reducer';
import sharesReducer from './shares/reducer';

export const store = configureStore({
  reducer: {
    taxes: taxesReducer,
    shares: sharesReducer,
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
