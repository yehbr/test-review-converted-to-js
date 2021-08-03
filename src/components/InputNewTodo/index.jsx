import React from 'react';
import styles from './InputNewTodo.module.css';
import { Form } from 'react-bootstrap';

const InputNewTodo = ({ placeholder, value, onChange, onKeyDown }) => {
  return (
    <Form.Control
      className={styles['new-todo']}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default InputNewTodo;
