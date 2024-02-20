// App.jsx
import TodoList from "./components/TodoList";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import Bild from "./assets/Moon.jpg";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <h1>The great planner</h1>
      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
      <img src={Bild} alt="moon" />
      <h2>Todos</h2>
      <TodoList searchTerm={searchTerm} />
    </>
  );
};

export default App;
