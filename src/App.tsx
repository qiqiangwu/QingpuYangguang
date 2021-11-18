import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import Counter from './features/counter/Counter';
import TodoApp from './views/TodoApp'

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Counter')}></Button>
    </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TodoApp">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Overview'}}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Counter" component={Counter} />
          <Stack.Screen name="TodoApp" component={TodoApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
