import React from 'react';
import {FlatList, Text, View} from 'react-native';
import TodoComponent, {Todo} from './Todo';
import {RootState} from '../../../store';
import {connect, ConnectedProps} from 'react-redux';
import {
  getTodos,
  getTodosByVisibilityFilter,
  selectVisibilityFilter,
} from '../todoAppSlice';

interface TodoListProps extends PropsFromRedux {}

const TodoList = ({todos}: TodoListProps) => {
  const renderItem = ({item}: {item: Required<Todo>}) => (
    <TodoComponent todo={item} />
  );

  return (
    <View>
      {todos && todos.length ? (
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item: Required<Todo>) =>
            item.id.toString()
          }></FlatList>
      ) : (
        <Text>No todos, yay!</Text>
      )}
    </View>
  );
};

const mapState = (store: RootState) => {
  const visibilityFilter = selectVisibilityFilter(store);
  const todos = getTodosByVisibilityFilter(store, visibilityFilter);
  return {todos};
};

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TodoList);
