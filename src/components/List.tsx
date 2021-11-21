import React, {Component, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../constants';
import {selectWindowHeight, selectWindowWidth} from '../redux/appSlice';
import {RootState} from '../store';
import Logger from '../utils/logger';

const logger = Logger.get('components/List');

export interface ListItem {
  id: number;
  image: string;
  title: string;
  date: string;
}

export interface ListProps extends PropsFromRedux {
  data: ListItem[];
  // 屏幕宽度
  screenWidth?: number;
  // 标识下拉刷新
  refreshing?: boolean;
  // 列表头部组件
  HeaderComponent?: React.ReactNode;
  // 是否有更多数据
  hasMore?: boolean;
  // 标识是否正在加载列表数据
  loading?: boolean;
  // 触发加载更多
  onLoadMore?: () => void;
  // 触发下拉刷新事件
  onRefresh?: () => void;
  // 监听垂直滚动位置
  scrollY?: Animated.Value;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const List = ({
  data = [],
  screenWidth = SIZES.width,
  refreshing = false,
  HeaderComponent = null,
  hasMore = true,
  loading = true,
  onLoadMore = () => {},
  onRefresh = () => {},
  scrollY = useRef(new Animated.Value(0)).current,
  windowHeight,
}: ListProps) => {
  const renderItem = ({item}: {item: ListItem}) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding * 2,
            paddingVertical: SIZES.padding,
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text style={{...FONTS.h2, paddingRight: SIZES.padding}}>
              {item.title}
            </Text>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.darkgray,
                marginTop: SIZES.padding * 2,
              }}>
              {item.date}
            </Text>
          </View>
          <Image
            source={{uri: item.image}}
            resizeMode="cover"
            style={{
              width: 120,
              height: 80,
              borderRadius: 4,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          height: 1,
          width: screenWidth - SIZES.padding * 2,
          backgroundColor: COLORS.darkgray,
          opacity: 0.2,
          margin: SIZES.padding,
        }}
      />
    );
  };

  const ListHeaderComponent = () => {
    logger.debug('ListHeaderComponent execute');
    return <View>{HeaderComponent}</View>;
  };

  const ListFooterComponent = () => {
    if (loading) {
      return <ActivityIndicator />;
    } else {
      if (hasMore) {
        return null;
      } else {
        return (
          <View
            style={{
              width: screenWidth,
              justifyContent: 'center',
              alignItems: 'center',
              padding: SIZES.padding,
              opacity: 0.5,
            }}>
            <Text style={{color: COLORS.darkgray}}>没有更多数据</Text>
          </View>
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        onEndReachedThreshold={0.4}
        onEndReached={onLoadMore}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: scrollY}},
            },
          ],
          {useNativeDriver: false},
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{flexGrow: 1}}
      />
    </View>
  );
};

const mapState = (state: RootState) => ({
  windowWidth: selectWindowWidth(state),
  windowHeight: selectWindowHeight(state),
});

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(List);
