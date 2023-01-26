import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getReducer = (state: RootState) => state.todoReducer;

export const selectToDos = createSelector(getReducer, state => state.todos);
