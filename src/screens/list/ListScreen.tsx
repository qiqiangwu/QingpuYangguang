import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {PromiseExecutor, RootStackParamList} from '../../common/types';
import List, {ListItem} from '../../components/List';
import {FetchArticleListParams} from '../../servcies/aums';
import {RootState} from '../../store';
import {
  fetchListArticleList,
  LOADING_FETCH_HOME_ARTICLE_LIST,
  selectList,
  selectLoading,
  selectTotalPage,
} from './listSlice';
import Logger from '../../utils/logger';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, View} from 'react-native';

const logger = Logger.get('/list/listScreen');

export interface ListScreenProps extends PropsFromRedux {}

type ListScreenRouteProp = RouteProp<RootStackParamList, 'List'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ListScreen = ({
  fetchHomeArticleList,
  list = [],
  loading = {},
  totalPage = 0,
}: ListScreenProps) => {
  const route = useRoute<ListScreenRouteProp>();

  const {cid} = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const initHomeArticleList = (cid: number) => {
    return new Promise(resolve => {
      fetchHomeArticleList({
        cid,
        pageIndex: 1,
        pageSize: 10,
        resolve,
      });

      setPageIndex(1);
    });
  };

  useEffect(() => {
    if (cid) {
      logger.info(`cid: ${cid}`);

      initHomeArticleList(cid);
    }
  }, [cid]);

  const onRefresh = () => {
    logger.info(`onRefresh execute`);
    if (cid) {
      setRefreshing(true);
      initHomeArticleList(cid).then(() => {
        setTimeout(() => {
          setRefreshing(false);
        }, 500);
      });
    }
  };

  const onLoadMore = () => {
    logger.info(`onLoadMore execute`);

    if (cid) {
      const nextPageIndex = pageIndex + 1;
      if (nextPageIndex > totalPage) {
        setHasMore(false);

        return;
      }

      setPageIndex(nextPageIndex);

      fetchHomeArticleList({
        cid,
        pageIndex: nextPageIndex,
        pageSize: 10,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <List
        data={list}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        loading={loading[LOADING_FETCH_HOME_ARTICLE_LIST]}
        hasMore={hasMore}
      />
    </SafeAreaView>
  );
};

const mapState = (state: RootState) => ({
  list: selectList(state) as ListItem[],
  loading: selectLoading(state),
  totalPage: selectTotalPage(state),
});

const mapDispatch = {
  fetchHomeArticleList: ({
    cid,
    pageSize,
    pageIndex,
    resolve,
  }: FetchArticleListParams & PromiseExecutor) =>
    fetchListArticleList({
      cid,
      pageIndex,
      pageSize,
      resolve,
    }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ListScreen);
