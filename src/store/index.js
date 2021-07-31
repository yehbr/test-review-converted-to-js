import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    list: (state = { todos: [] }, action) => {
      switch (action.type) {
        case 'ADD_TODO': {
          // const newState = state;
          // newState.todos.push(action.payload);
          // return newState;

          // Используя конструкцию switch case с передачей типа экшена мы используем формат записи библиотеки redux, хотя и работаем с библиотекой redux toolkit, поэтому в старом формате мутировать напрямую стейт нельзя как сделанно выше, а нужно делать копию стейта и добавлять в копию уже новое значение. 

          return {
            ...state,
            todos: [...state.todos, action.payload],
          };
        }
        case 'REMOVE_TODO': {
          return {
            ...state,
            todos: state.todos.filter((t, index) => index !== action.payload),
          };
        }
        case 'CHANGE_TODOS': {
          return {
            todos: action.payload,
          };
        }
        default:
          return state;
      }
    },
  },
});
