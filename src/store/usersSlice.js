import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Тянем данные с API сразу в наш стор, с помощью redux-thunk встроенного в toolkit

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (dispatch, getState) => {
    return await fetch('https://jsonplaceholder.typicode.com/users/').then(
      (res) => res.json()
    );
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: null,
  },
  // Контролируем статус ответа, кладем значение в стор, в будущем значением status можем оповещать UI (притянулись ли данные или нет)
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.status = 'fetching';
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = 'success';
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default usersSlice.reducer;
