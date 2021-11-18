import {createSlice} from '@reduxjs/toolkit';
import {VISIBILITY_FILTERS} from '../../constants';
import {RootState} from '../../store';
import {Todo} from './components/Todo';

let nextTodoId = 0;

interface TodoAppState {
  allIds: number[];
  byIds: {
    [key: number]: Todo;
  };
  visibilityFilter: string;
}

const initialState: TodoAppState = {
  allIds: [],
  byIds: {},
  visibilityFilter: VISIBILITY_FILTERS.ALL,
};

export interface AddTodoPayload {
  id: number;
  content: string;
}

export const todoAppSlice = createSlice({
  name: 'todoApp',
  initialState,
  reducers: {
    addTodo(state, action) {
      const {id, content} = action.payload;
      state.allIds = [...state.allIds, id];
      state.byIds = {
        ...state.byIds,
        [id]: {
          content,
          completed: false,
        },
      };
    },
    toggleTodo(state, action) {
      const {id} = action.payload;
      state.byIds = {
        ...state.byIds,
        [id]: {
          ...state.byIds[id],
          completed: !state.byIds[id].completed,
        },
      };
    },
    setFilter(state, action) {
      state.visibilityFilter = action.payload.filter;
    },
  },
});

export function getNextTodoId() {
  return ++nextTodoId;
}

export const {addTodo, toggleTodo, setFilter} = todoAppSlice.actions;

export default todoAppSlice.reducer;

// selectors
export const getTodoAppState = (store: RootState) => store.todoApp;

export const getTodoList = (store: RootState) =>
  getTodoAppState(store) ? getTodoAppState(store).allIds : [];

export const getTodoById = (store: RootState, id: number) => {
  const todoAppState = getTodoAppState(store);
  if (todoAppState) {
    const find = todoAppState.byIds[id];
    if (find) {
      return {...find, id};
    }
  }
  return null;
};

export const getTodos: (store: RootState) => Required<Todo>[] = (
  store: RootState,
) => {
  const todos: Required<Todo>[] = [];

  getTodoList(store).forEach(id => {
    const todo = getTodoById(store, id);
    if (todo) {
      todos.push(todo);
    }
  });

  return todos;
};

export const selectVisibilityFilter = (store: RootState) =>
  getTodoAppState(store)
    ? getTodoAppState(store).visibilityFilter
    : VISIBILITY_FILTERS.ALL;

export const getTodosByVisibilityFilter = (
  store: RootState,
  visibilityFilter: string,
) => {
  const allTodos = getTodos(store);
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter(todo => todo.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter(todo => !todo.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos;
  }
};
