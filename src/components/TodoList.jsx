import { useState, useEffect } from "react";
import "./TodoList.css";

function TodoList({ searchTerm }) {
  // Zustand für die Aufgabenliste
  const [todos, setTodos] = useState([]);

  // Sidenote 1: Hier wird ein Zustand 'filter' erstellt und 'setFilter' ist eine Funktion,
  // die verwendet wird, um den Zustand zu aktualisieren. 'useState' wird verwendet, um den
  // Anfangszustand auf ein leeres Array [] zu setzen.
  const [filter, setFilter] = useState([]);

  // Sidenote 2: Dies ist ein Nebeneffekt, der ausgeführt wird, wenn sich 'searchTerm' oder 'todos' ändert.
  useEffect(() => {
    // Sidenote 3: Hier werden die Aufgaben in 'todos' gefiltert. 'filter' wird zu einem
    // Array von Aufgaben, bei denen der 'title' der Aufgabe den 'searchTerm' enthält.
    const filteredTodos = todos.filter((todo) =>
      todo.title.includes(searchTerm)
    );

    // Sidenote 4: Das gefilterte Array 'filteredTodos' wird in den 'filter'-Zustand gesetzt,
    // wodurch die Komponente neu gerendert wird und die sichtbaren Aufgaben aktualisiert werden.
    setFilter(filteredTodos);
  }, [searchTerm, todos]);

  // Zustände für den Bearbeitungsmodus und den zu bearbeitenden Text
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  // Laden der Aufgabenliste aus dem Local Storage beim ersten Laden der Seite
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Funktion zum Hinzufügen einer neuen Aufgabe
  const addTodo = (newTodo) => {
    if (newTodo.trim() !== "") {
      const updatedTodos = [...todos, { id: Date.now(), title: newTodo }];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  // Funktion zum Aktualisieren einer Aufgabe im Bearbeitungsmodus
  const updateTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newText } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
    setEditText("");
    setEditId(null);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Funktion zum Behandeln des Formularabsendens (Hinzufügen oder Speichern)
  const handlesubmit = (event) => {
    event.preventDefault();
    const newTodo = document.getElementById("todoInput").value;

    if (isEditing) {
      // Wenn im Bearbeitungsmodus, aktualisiere die Aufgabe
      updateTodo(editId, editText);
    } else {
      // Wenn nicht, füge eine neue Aufgabe hinzu
      addTodo(newTodo);
    }

    // Zurücksetzen des Bearbeitungsmodus und der Eingabe
    setIsEditing(false);
    setEditText("");
    setEditId(null);
    document.getElementById("todoInput").value = "";
  };

  // Funktion zum Starten des Bearbeitungsmodus für eine Aufgabe
  const startEditing = (id, text) => {
    setIsEditing(true);
    setEditId(id);
    setEditText(text);
  };

  // Funktion zum Löschen einer Aufgabe
  const deleteButton = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <form onSubmit={handlesubmit}>
      <div className="inputField">
        <input
          type="text"
          id="todoInput"
          placeholder="Deine Aufgaben..."
          required
        />
        <div className="addBtnBox">
          <button id="addButton">Add Todo</button>
        </div>

        <ul>
          {filter.map((todo) => (
            <li key={todo.id}>
              <div className="todo-title">
                {isEditing && editId === todo.id ? (
                  // If in edit mode, show an input field
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  todo.title
                )}
              </div>
              {isEditing && editId === todo.id ? (
                <button
                  className="saveBtn"
                  type="button"
                  onClick={handlesubmit}>
                  Save
                </button>
              ) : (
                <div className="todo-actions">
                  <div className="button-container">
                    <button
                      className="listBtn"
                      type="button"
                      onClick={() => deleteButton(todo.id)}>
                      Delete
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => startEditing(todo.id, todo.title)}>
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default TodoList;
