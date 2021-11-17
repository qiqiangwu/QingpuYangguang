import React from 'react';
import {Button, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment, selectCount} from './counterSlice';

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Increment" onPress={() => dispatch(increment())}></Button>
      <Text>{count}</Text>
      <Button title="Decrement" onPress={() => dispatch(decrement())}></Button>
    </View>
  );
}
