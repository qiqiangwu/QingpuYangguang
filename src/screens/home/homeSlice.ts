import {createSlice} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../../store';
import {
  Column,
  fetchArticleList,
  fetchColumns,
  TopAd,
} from './home.service';
import Logger from '../../utils/logger';
import {IFormatResponse} from '../../utils/request';
import {FetchArticleListParams} from '../../servcies/aums';
import {Article, PromiseExecutor} from '../../common/types';

const logger = Logger.get('screens/home/homeSlice');

interface HomeState {
  topAds: TopAd[];
  nav: Column[];
  notice?: Column;
  list: Article[];
  totalPage?: number;
  // 接口请求状态
  loading: {
    [key: string]: boolean;
  };
}

const initialState: HomeState = {
  topAds: [],
  nav: [],
  list: [],
  loading: {},
};

export const LOADING_FETCH_HOME_ARTICLE_LIST = 'fetchHomeArticleList';

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    updateLoading(state, {payload}) {
      state.loading = {
        ...state.loading,
        ...payload,
      };
    },
    saveList(state, {payload}) {
      if (payload.pageIndex === 1) {
        state.list = [...payload.list];
        state.totalPage = payload.totalPage;
      } else {
        state.list = [...state.list, ...payload.list];
      }
    },
  },
});

export const {save, updateLoading, saveList} = homeSlice.actions;

export default homeSlice.reducer;

export const fetchHomeData =
  (cid: number, level: number): AppThunk =>
  dispatch => {
    return fetchColumns(cid, level).then((result: IFormatResponse<any>) => {
      logger.debug(`fetchColumns result: `, result);

      if (!result.hasError) {
        dispatch(save(result.data));
      }
    });
  };

export const fetchHomeArticleList =
  ({
    cid,
    pageSize,
    pageIndex,
    resolve = () => {},
  }: FetchArticleListParams & PromiseExecutor): AppThunk =>
  dispatch => {
    dispatch(
      updateLoading({
        [LOADING_FETCH_HOME_ARTICLE_LIST]: true,
      }),
    );

    return fetchArticleList({cid, pageSize, pageIndex}).then(
      (result: IFormatResponse<any>) => {
        dispatch(
          updateLoading({
            [LOADING_FETCH_HOME_ARTICLE_LIST]: false,
          }),
        );

        resolve();

        if (!result.hasError) {
          dispatch(
            saveList({
              pageIndex,
              list: result.data?.list || [],
              totalPage: result.data?.totalPage || 0,
            }),
          );
        }
      },
    );
  };

// selector

export const selectHomeState = (store: RootState) => store.home;

export const selectTopNav = (store: RootState) =>
  selectHomeState(store) ? selectHomeState(store).topAds : [];

export const selectNav = (store: RootState) => selectHomeState(store)?.nav;

export const selectNotice = (store: RootState) =>
  selectHomeState(store)?.notice;

export const selectList = (store: RootState) => selectHomeState(store)?.list;
export const selectTotalPage = (store: RootState) =>
  selectHomeState(store)?.totalPage;
export const selectLoading = (store: RootState) =>
  selectHomeState(store)?.loading;
