import {createSlice} from '@reduxjs/toolkit';
import {SIZES} from '../constants';
import {AppThunk, RootState} from '../store';

interface AppState {
  width: number;
  height: number;
}

const initialState: AppState = {
  width: SIZES.width,
  height: SIZES.height,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateWindowSize(state, {payload}) {
      state.width = payload.width;
      state.height = payload.height;
    },
  },
});

export const {updateWindowSize} = appSlice.actions;

export default appSlice.reducer;

// selector

export const selectAppState = (store: RootState) => store.app;

export const selectWindowWidth = (store: RootState) =>
  selectAppState(store).width;
export const selectWindowHeight = (store: RootState) =>
  selectAppState(store).height;
