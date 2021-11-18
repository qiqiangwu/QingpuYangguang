import {configureStore} from '@reduxjs/toolkit';
import todoAppReducer from './views/TodoApp/todoAppSlice';

const store = configureStore({
  reducer: {
    todoApp: todoAppReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
