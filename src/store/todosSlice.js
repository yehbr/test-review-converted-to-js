import { createSlice } from '@reduxjs/toolkit';

// Создаем функцию которая принимает стейт на входе и делает проверку на завершенность всех туду. Вызываем ее в каждом редьюсере которые взаимодействуют с туду, создание, изменение, удаление.
const checkAllTodoCompleted = (state) => {
  if (state.todos.every((i) => i.isDone) & (state.todos.length !== 0)) {
    state.allTodosIsDone = true;
  } else {
    state.allTodosIsDone = false;
  }
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    allTodosIsDone: false,
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.todos.push(action.payload);
        checkAllTodoCompleted(state);
      },
      prepare: (text) => {
        const id = new Date().toISOString();
        const isDone = false;
        const ownedBy = null;
        return { payload: { id, text, isDone, ownedBy } };
      },
    },
    changeTodo(state, action) {
      state.todos = action.payload;
      checkAllTodoCompleted(state);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((i) => i.id !== action.payload);
      checkAllTodoCompleted(state);
    },
  },
});

export default todosSlice.reducer;
export const { addTodo, changeTodo, removeTodo } = todosSlice.actions;
