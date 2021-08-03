import React from 'react';
import MainApp from '../MainApp';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const { todos, allTodosIsDone } = useSelector((state) => state.todosList);
  const { users } = useSelector((state) => state.usersList);

  return (
    <div className="App main">
      <header className="App-header">
        <h1>TODO list with users</h1>
      </header>
      <MainApp todos={todos} users={users} allTodosIsDone={allTodosIsDone} />
      <footer className="App-footer">
        <a
          href="https://example.org"
          target="_blank"
          className="App-footer-link"
        >
          All right reserved
        </a>
      </footer>
    </div>
  );
}
export default App;
