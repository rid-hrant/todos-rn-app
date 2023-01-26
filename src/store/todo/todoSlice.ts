import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {store} from '../store';
import {TToDoItem, TToDoSlice} from './types';

const initialState: TToDoSlice = {
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addToDo: (state, action: PayloadAction<TToDoItem>) => {
      state.todos = [...state.todos, action.payload];
    },
    removeToDo: (state, action: PayloadAction<TToDoItem>) => {
      state.todos = state.todos.filter((todo: TToDoItem) => {
        return todo.id !== action.payload.id;
      });
    },
  },
});

export const {addToDo, removeToDo} = todosSlice.actions;
export default todosSlice.reducer;
