import React from 'react';
import styles from './InputNewTodo.module.css';
export class InputNewTodo extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (e) => {
            this.props.onChange(e.target.value);
        };
        this.handleKeyDown = (event) => {
            if (event.keyCode !== 13) {
                return;
            }
            event.preventDefault();
            var val = this.state.value.trim();
            if (val) {
                this.props.onSubmit({
                    title: this.state.value,
                    isDone: false,
                });
                this.props.onChange('');
            }
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.todoTitle !== prevProps.todoTitle) {
            this.setState({ value: this.props.todoTitle });
        }
    }
    render() {
        return (<input className={styles['new-todo']} type="text" value={this.props.todoTitle} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="What needs to be done?"/>);
    }
}
