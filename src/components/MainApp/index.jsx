import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import InputNewTodo from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { useDispatch } from 'react-redux';
import styles from './MainApp.module.css';
import { addTodo, removeTodo, changeTodo } from '../../store/todosSlice';

const MainApp = ({ todos, allTodosIsDone, users }) => {
  const dispatch = useDispatch();

  // Вэлью инпута я не стал определять в стор редакса. Использую локальный стейт.
  const [text, setText] = useState('');
  const handleTodoTitle = (e) => {
    setText(e.target.value);
  };

  const handleSubmitTodo = (e) => {
    if (e.keyCode == 13) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div className={styles.main}>
      <Form.Check
        type="checkbox"
        label="all todos is done!"
        checked={allTodosIsDone}
        readOnly
      />
      <hr />
      <InputNewTodo
        value={text}
        onChange={handleTodoTitle}
        onKeyDown={handleSubmitTodo}
        placeholder="What needs to be done?"
      />
      {todos.map((i, idx) => (
        <div className={styles.todo} key={idx}>
          <div
            className={styles.body}
            style={i.isDone ? { textDecoration: 'line-through' } : null}
          >
            {i.text}
          </div>
          <div className={styles.footer}>
            <Form.Check
              type="checkbox"
              checked={i.isDone}
              onChange={() => {
                const changedTodos = todos.map((i, index) => {
                  const res = { ...i };
                  if (index == idx) {
                    res.isDone = !i.isDone;
                  }
                  return res;
                });
                dispatch(changeTodo(changedTodos));
              }}
            />
            <UserSelect
              user={i.user}
              users={users}
              todos={todos}
              idx={idx}
              key={idx}
            />
            <Button onClick={() => dispatch(removeTodo(i.id))}>Remove</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainApp;
