import React, {useEffect, useRef, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {PromiseExecutor} from '../../../common/types';
import List, {ListItem} from '../../../components/List';
import {FetchArticleListParams} from '../../../servcies/aums';
import {RootState} from '../../../store';
import {
  fetchHomeArticleList,
  LOADING_FETCH_HOME_ARTICLE_LIST,
  selectList,
  selectLoading,
  selectNotice,
  selectTotalPage,
} from '../homeSlice';
import Logger from '../../../utils/logger';
import {Animated, Platform, StyleSheet, Text, View} from 'react-native';
import appConfig from '../../../appConfig';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../../constants';

const logger = Logger.get('/home/HomeList');

export interface HomeListProps extends PropsFromRedux {
  ListHeaderComponent?: React.ReactNode;
}

const HomeList = ({
  cid,
  fetchHomeArticleList,
  list = [],
  ListHeaderComponent = null,
  loading = {},
  totalPage = 0,
}: HomeListProps) => {
  const scrollYAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  logger.info(`${Platform.OS} insets: `, insets);

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
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.header,
          {
            paddingTop: insets.top,
            height: 50 + insets.top,
            opacity: scrollYAnim.interpolate({
              inputRange: [0, 300],
              outputRange: [0, 1],
            }),
            backgroundColor: COLORS.primary,
          },
        ]}>
        <Text style={styles.headerTitle}>{appConfig.appName}</Text>
      </Animated.View>
      <List
        scrollY={scrollYAnim}
        data={list}
        HeaderComponent={ListHeaderComponent}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        loading={loading[LOADING_FETCH_HOME_ARTICLE_LIST]}
        hasMore={hasMore}
      />
    </View>
  );
};

const mapState = (state: RootState) => ({
  cid: selectNotice(state)?.id,
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
    fetchHomeArticleList({
      cid,
      pageIndex,
      pageSize,
      resolve,
    }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomeList);

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
  },
});
