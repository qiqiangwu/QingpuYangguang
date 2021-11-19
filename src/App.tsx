import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/home/Home';
import List from './screens/list/ListScreen';
import {useEffect} from 'react';
import {useAppDispatch} from './hooks';
import {connect, Provider} from 'react-redux';
import store from './store';
import {Dimensions, ScaledSize} from 'react-native';
import Logger from './utils/logger';
import {updateWindowSize} from './redux/appSlice';
import {COLORS} from './constants';

const logger = Logger.get('App');

const Stack = createNativeStackNavigator();

const Main = connect()(() => {
  const dispatch = useAppDispatch();

  const onChange = ({
    window,
    screen,
  }: {
    window: ScaledSize;
    screen: ScaledSize;
  }) => {
    logger.debug('window:', window);
    logger.debug('screen:', screen);

    dispatch(
      updateWindowSize({
        width: window.width,
        height: window.height,
      }),
    );
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Group
          screenOptions={{
            title: '',
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: COLORS.white,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{header: () => null}}
          />
          <Stack.Screen name="List" component={List} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const App = () => {
  return (
    <Provider store={store}>
      <Main></Main>
    </Provider>
  );
};

export default App;
