import React from 'react';

function TodoFooter({ todos }) {
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> items left
      </span>
    </footer>
  );
}

export default TodoFooter;
