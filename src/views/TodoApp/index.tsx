import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import VisibilityFilters from './components/VisibilityFilters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
});

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </SafeAreaView>
  );
};
