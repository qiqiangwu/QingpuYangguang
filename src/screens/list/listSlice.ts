import {createSlice} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../../store';
import {fetchArticleList} from './list.service';
import Logger from '../../utils/logger';
import {IFormatResponse} from '../../utils/request';
import {FetchArticleListParams} from '../../servcies/aums';
import {Article, PromiseExecutor} from '../../common/types';

const logger = Logger.get('screens/list/listSlice');

interface ListState {
  list: Article[];
  totalPage?: number;
  // 接口请求状态
  loading: {
    [key: string]: boolean;
  };
}

const initialState: ListState = {
  list: [],
  loading: {},
};

export const LOADING_FETCH_HOME_ARTICLE_LIST = 'fetchHomeArticleList';

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
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

export const {updateLoading, saveList} = listSlice.actions;

export default listSlice.reducer;

export const fetchListArticleList =
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

export const selectListState = (store: RootState) => store.list;

export const selectList = (store: RootState) => selectListState(store)?.list;
export const selectTotalPage = (store: RootState) =>
  selectListState(store)?.totalPage;
export const selectLoading = (store: RootState) =>
  selectListState(store)?.loading;
