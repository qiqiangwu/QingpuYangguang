import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import homeReducer from './screens/home/homeSlice';
import appReducer from './redux/appSlice';
import listReducer from './screens/list/listSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    app: appReducer,
    list: listReducer,
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
