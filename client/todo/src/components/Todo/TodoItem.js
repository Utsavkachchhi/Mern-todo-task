import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
      />
      <span className="title">{todo.title}</span>
      <button onClick={() => onDelete(todo._id)} className="delete-btn">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;