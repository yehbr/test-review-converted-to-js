import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';
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
    }
    render() {
        const { todoTitle } = this.state;
        window.allTodosIsDone = true;
        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false;
            }
            else {
                window.allTodosIsDone = true;
            }
        });
        return (<div>
                <Form.Check type="checkbox" label="all todos is done!" checked={window.allTodosIsDone}/>
                <hr />
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo}/>
                {this.props.todos.map((t, idx) => (<div className={styles.todo}>
                        {t.title}
                        <UserSelect user={t.user} idx={idx}/>
                        <Form.Check style={{ marginTop: -8, marginLeft: 5 }} type="checkbox" checked={t.isDone} onChange={(e) => {
                    const changedTodos = this.props.todos.map((t, index) => {
                        const res = { ...t };
                        if (index == idx) {
                            res.isDone = !t.isDone;
                        }
                        return res;
                    });
                    this.props.changeTodo(changedTodos);
                }}/>
                    </div>))}
            </div>);
    }
}
export default connect((state) => ({}), (dispatch) => ({
    addTodo: (todo) => {
        dispatch({ type: 'ADD_TODO', payload: todo });
    },
    changeTodo: (todos) => dispatch({ type: 'CHANGE_TODOS', payload: todos }),
    removeTodo: (index) => dispatch({ type: 'REMOVE_TODOS', payload: index }),
}))(Index);
