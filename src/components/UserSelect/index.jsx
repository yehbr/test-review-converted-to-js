import React, { useEffect } from 'react';
import styles from './UserSelect.module.css';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../store/usersSlice';
import { changeTodo } from '../../store/todosSlice';

const UserSelect = ({ idx, todos, users }) => {
  const dispatch = useDispatch();

  // Диспатчим экшен для подтягивания данных с API в наш стейт. Экшен будет срабатывать всегда когда мы отрисовываем компонент селекта. Данные с стейта передаем через пропсы.
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleChange = (e) => {
    const changedTodos = todos.map((i, index) => {
      const res = { ...i };
      if (index == idx) {
        res.ownedBy = e.target.value;
      }
      return res;
    });
    dispatch(changeTodo(changedTodos));
  };

  return (
    <select
      defaultValue="Choose user"
      name="user"
      className={styles.user}
      onChange={handleChange}
    >
      <option value="Choose user" disabled>
        Choose user
      </option>
      {users.map((user) => (
        <option value={user.name} key={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};
export default UserSelect;
