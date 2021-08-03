import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosSlice from './todosSlice';
import usersSlice from './usersSlice';

const rootReducer = combineReducers({
  todosList: todosSlice,
  usersList: usersSlice,
});

export default configureStore({
  reducer: rootReducer,
});
