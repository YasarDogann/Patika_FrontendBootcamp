import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import './styles/index.css';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={(e) => { e.preventDefault(); addTodo(e.target.elements.todoInput.value); e.target.reset(); }}>
          <input className="new-todo" name="todoInput" placeholder="What needs to be done?" autoFocus />
        </form>
      </header>
      <TodoList todos={todos} setTodos={setTodos} />
      <TodoFooter todos={todos} />
    </div>
  );
}

export default App;
