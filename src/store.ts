import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import appReducer from './redux/appSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
