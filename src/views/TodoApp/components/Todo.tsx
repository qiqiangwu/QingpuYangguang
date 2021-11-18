import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {toggleTodo} from '../todoAppSlice';

export interface Todo {
  id?: number;
  completed: boolean;
  content: string;
}

interface TodoProps extends Partial<PropsFromRedux> {
  todo: Required<Todo>;
}

const TodoComponent = ({todo, toggleTodo}: TodoProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        toggleTodo?.({
          id: todo.id,
        });
      }}>
      <Text>
        {todo && todo.completed ? '👌' : '👋'} {todo.content}
      </Text>
    </TouchableOpacity>
  );
};

const mapDispatch = {
  toggleTodo: (payload: any) => toggleTodo(payload),
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TodoComponent);
