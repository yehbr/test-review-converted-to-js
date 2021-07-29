import React from 'react';
import './App.css';
import MainApp from '../MainApp';
import logo from '../../logo.svg';
import { useSelector } from 'react-redux';

function App() {
  const todos = useSelector((state) => state.list.todos);
  return (
    // туду лист для юзеров:
    <div className="App main">
      <header className="App-header">
        TODO list with users:
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      {/* MAIN APP: */}
      <MainApp todos={todos} />

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
