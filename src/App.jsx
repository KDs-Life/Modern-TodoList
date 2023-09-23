import TodoList from "./components/TodoList";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import Bild from "./assets/Moon.jpg"


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <h1>The great planer</h1>
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <img src={Bild} />
      <h2>Todos</h2>
      <TodoList searchTerm={searchTerm} />
    </>
  );
};

export default App;
