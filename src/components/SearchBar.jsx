import  { useState } from 'react';

// Sidenote 1: Diese Navbar-Komponente wird ein Suchfeld anzeigen.
function Navbar({ onSearch }) {
  // Sidenote 2: Hier wird ein Zustand für den eingegebenen Suchbegriff verwaltet.
  const [searchTerm, setSearchTerm] = useState('');

  // Sidenote 3: Diese Funktion wird aufgerufen, wenn der Benutzer auf "Suchen" klickt.
  const handleSearch = () => {
    // Sidenote 4: Wir rufen die übergeordnete Komponente-Funktion onSearch auf und übergeben den Suchbegriff.
    onSearch(searchTerm);
  };

  return (
    <div className="navbar">
      {/* Sidenote 5: Das Eingabefeld, in dem der Benutzer seinen Suchbegriff eingeben kann. */}
      <input
        type="text"
        placeholder="Suche..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Sidenote 6: Änderungen im Eingabefeld aktualisieren den searchTerm-Zustand.
      />
      {/* Sidenote 7: Die Schaltfläche "Suchen", die bei Klick die handleSearch-Funktion aufruft. */}
      <button onClick={handleSearch}>Suchen</button>
    </div>
  );
}

export default Navbar;
