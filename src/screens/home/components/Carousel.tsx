import React from 'react';
import {Animated, Image, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {COLORS, SIZES} from '../../../constants';
import {selectWindowWidth} from '../../../redux/appSlice';
import {RootState} from '../../../store';
import {TopAd} from '../home.service';

interface Props extends PropsFromRedux {
  data: TopAd[];
}

const Carousel = ({data = [], screenWidth}: Props) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  function renderCarouselDots() {
    const dotPosition = Animated.divide(scrollX, screenWidth);

    return (
      <View
        style={{
          height: 30,
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          justifyContent: 'center'
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}>
          {data?.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });
            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                style={{
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                  marginHorizontal: 6,
                  borderRadius: SIZES.radius,
                  opacity: opacity,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View style={{height: 280, position: 'relative'}}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x: scrollX},
              },
            },
          ],
          {useNativeDriver: false},
        )}
        style={{}}>
        {data.map((item, index) => (
          <View key={`carousel-${index}`} style={{alignItems: 'center'}}>
            <Image
              source={{uri: item.image}}
              resizeMode="cover"
              style={{
                width: screenWidth,
                height: 280,
              }}
            />
          </View>
        ))}
      </Animated.ScrollView>
      {renderCarouselDots()}
    </View>
  );
};

const mapState = (state: RootState) => ({
  screenWidth: selectWindowWidth(state),
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Carousel);
