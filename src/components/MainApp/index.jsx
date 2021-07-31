import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect, useDispatch, useSelector } from 'react-redux';
import styles from './MainApp.module.css';
import { getUsers } from '../../store/usersSlice';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleTodoTitle = (todoTitle) => {
      this.setState({ todoTitle });
    };
    this.handleSubmitTodo = (todo) => {
      this.props.addTodo(todo);
    };
    this.state = { todoTitle: '' };
    this.allTodosIsDone = false;
  }
  render() {
    const { todoTitle } = this.state;
    // Чтобы работала проверка, выполнены ли все тудушки, мы не должны обращаться к глобальному свойству window, window работает напрямую с DOM, минуя реакт

    // window.allTodosIsDone = true;

    // Проверка на все завершенные тудушки неправильно работала, плюс опять ссылались на глобальный объект window

    // this.props.todos.map((t) => {
    //   if (!t.isDone) {
    //     window.allTodosIsDone = false;
    //   } else {
    //     window.allTodosIsDone = true;
    //   }
    // });

    // Делаем проверку через every, если все элементы isDone у нас true и массив todos не пуст, то присваиваем классовой переменной нужное булевое значение, от которого будет рисоваться уже UI

    if (
      this.props.todos.every((i) => i.isDone) &
      (this.props.todos.length !== 0)
    ) {
      this.allTodosIsDone = true;
    } else {
      this.allTodosIsDone = false;
    }

    return (
      <div>
        <Form.Check
          type="checkbox"
          label="all todos is done!"
          checked={this.allTodosIsDone}
          readOnly
        />
        <hr />
        <InputNewTodo
          todoTitle={todoTitle}
          onChange={this.handleTodoTitle}
          onSubmit={this.handleSubmitTodo}
        />
        {this.props.todos.map((t, idx) => (
          <div className={styles.todo} key={idx}>
            {t.title}
            <UserSelect user={t.user} idx={idx} key={idx} />
            <Form.Check
              style={{ marginTop: -8, marginLeft: 5 }}
              type="checkbox"
              checked={t.isDone}
              onChange={(e) => {
                const changedTodos = this.props.todos.map((t, index) => {
                  const res = { ...t };
                  if (index == idx) {
                    res.isDone = !t.isDone;
                  }
                  return res;
                });
                this.props.changeTodo(changedTodos);
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}
export default connect(
  (state) => ({}),
  (dispatch) => ({
    addTodo: (todo) => dispatch({ type: 'ADD_TODO', payload: todo }),
    changeTodo: (todos) => dispatch({ type: 'CHANGE_TODOS', payload: todos }),
    removeTodo: (index) => dispatch({ type: 'REMOVE_TODOS', payload: index }),
  })
)(Index);
