import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';
function UserSelect(props) {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.list.todos);
    React.useEffect(() => {
        console.log('userSelect');
        fetch('https://jsonplaceholder.typicode.com/users/').then((users) => users.json()).then(users => setOptions(users));
    }, []);
    const [options, setOptions] = React.useState([]);
    const { idx } = props;
    const handleChange = (e) => {
        const changedTodos = todos.map((t, index) => {
            const res = { ...t };
            if (index == idx) {
                console.log('props.user', props.user);
                res.user = e.target.value;
            }
            return res;
        });
        dispatch({ type: 'CHANGE_TODO', payload: changedTodos });
    };
    return (<select name="user" className={styles.user} onChange={handleChange}>
            {options.map((user) => <option value={user.id}>{user.name}</option>)}
        </select>);
}
export default UserSelect;
