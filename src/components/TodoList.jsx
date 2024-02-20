// TodoList.jsx
import React, { useState, useEffect } from "react";
import "./TodoList.css";

function TodoList({ searchTerm }) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const filteredTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilter(filteredTodos);
  }, [searchTerm, todos]);

  const addTodo = (newTodo) => {
    if (newTodo.trim() !== "") {
      const updatedTodos = [...todos, { id: Date.now(), title: newTodo }];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const updateTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newText } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = event.target.todoInput.value;

    if (newTodo.trim() !== "") {
      if (event.target.addBtn) {
        addTodo(newTodo);
      } else {
        updateTodo(event.target.editId.value, event.target.editText.value);
      }

      event.target.reset();
    }
  };

  const startEditing = (id, text) => {
    document.getElementById("editId").value = id;
    document.getElementById("editText").value = text;
  };

  const deleteButton = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputField">
        <input
          type="text"
          id="todoInput"
          name="todoInput"
          placeholder="Deine Aufgaben..."
          required
        />
        <div className="addBtnBox">
          <button type="submit" name="addBtn">Add Todo</button>
        </div>

        <ul>
          {filter.map((todo) => (
            <li key={todo.id}>
              <div className="todo-title">
                {todo.title}
              </div>
              <div className="todo-actions">
                <button type="button" onClick={() => deleteButton(todo.id)}>Delete</button>
                <button type="button" onClick={() => startEditing(todo.id, todo.title)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
        <input type="hidden" id="editId" name="editId" />
        <input type="hidden" id="editText" name="editText" />
      </div>
    </form>
  );
}

export default TodoList;
