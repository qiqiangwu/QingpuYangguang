import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect, ConnectedProps} from 'react-redux';
import appConfig from '../../appConfig';
import {COLORS} from '../../constants';
import {RootState} from '../../store';
import Carousel from './components/Carousel';
import HomeList from './components/HomeList';
import Nav from './components/Nav';
import {fetchHomeData, selectNav, selectTopNav} from './homeSlice';

interface Props extends PropsFromRedux {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
});

const Home = ({topAds, fetchHomeData, nav}: Props) => {
  useEffect(() => {
    fetchHomeData(appConfig.data.home.id, appConfig.data.home.level);
  }, []);

  const ListHeaderComponent = (
    <>
      <Carousel data={topAds} />
      <Nav data={nav} />
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <HomeList ListHeaderComponent={ListHeaderComponent} />
    </SafeAreaView>
  );
};

const mapState = (state: RootState) => ({
  topAds: selectTopNav(state),
  nav: selectNav(state),
});

const mapDispatch = {
  fetchHomeData: (id: number, level: number) => fetchHomeData(id, level),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Home);
