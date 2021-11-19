import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {
  HomeScreenNavigationProp,
  RootStackParamList,
} from '../../../common/types';
import {COLORS, SIZES} from '../../../constants';
import {selectWindowWidth} from '../../../redux/appSlice';
import {RootState} from '../../../store';
import {Column} from '../home.service';

interface NavProps extends PropsFromRedux {
  data: Column[];
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: -20,
    marginHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding * 2,
    paddingBottom: SIZES.padding,
  },
  mainNavItem: {
    marginBottom: SIZES.padding,
  },
});

const mainNavCols = 4;

const Nav = ({data = [], screenWidth}: NavProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const mainNavItemStyle = {
    ...styles.mainNavItem,
    width: (screenWidth - SIZES.padding * 4) / mainNavCols,
  };

  const onNavPressedHandler = (item: Column) => {
    navigation.navigate('List', {
      cid: item.id,
    });
  };

  const renderItem = ({item}: {item: Column}) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          ...mainNavItemStyle,
        }}
        onPress={() => onNavPressedHandler(item)}>
        <View>
          <Image
            source={{uri: item.icon}}
            resizeMode="contain"
            style={{
              width: 80,
              height: 80,
            }}
          />
        </View>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        numColumns={mainNavCols}
        columnWrapperStyle={mainNavItemStyle}
        renderItem={renderItem}
        horizontal={false}
      />
    </View>
  );
};

const mapState = (state: RootState) => ({
  screenWidth: selectWindowWidth(state),
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Nav);
