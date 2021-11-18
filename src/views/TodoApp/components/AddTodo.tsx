import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {addTodo, AddTodoPayload, getNextTodoId} from '../todoAppSlice';

interface DispatchProps {
  addTodo: (payload: AddTodoPayload) => void;
}

type Props = DispatchProps;

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const AddTodo = ({addTodo}: Props) => {
  const [text, onChangeText] = useState('');

  function handleAddTodo() {
    if (!text) {
      return;
    }
    addTodo({
      id: getNextTodoId(),
      content: text,
    });
    onChangeText('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        style={styles.input}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
    </View>
  );
};

const mapDispatch = {
  addTodo: (payload: AddTodoPayload) => addTodo(payload),
};

export default connect(null, mapDispatch)(AddTodo);
