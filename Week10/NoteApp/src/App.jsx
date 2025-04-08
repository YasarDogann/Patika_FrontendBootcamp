import React, { useState } from 'react';
import './index.css';

const colors = ["#F28B82", "#F7C774", "#AECBFA", "#CCFF90"];

function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [searchText, setSearchText] = useState("");

  const addNote = () => {
    if (noteText.trim()) {
      setNotes([
        ...notes,
        { text: noteText, color: selectedColor, id: Date.now() },
      ]);
      setNoteText("");
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="app">
      <h1>NotesApp</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />
      <div className="note-input-container">
        <textarea
          placeholder="Enter your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        ></textarea>
        <div className="color-picker">
          {colors.map((color) => (
            <span
              key={color}
              className="color-dot"
              style={{
                backgroundColor: color,
                border: selectedColor === color ? "2px solid #000" : "none",
              }}
              onClick={() => handleColorChange(color)}
            ></span>
          ))}
        </div>
        <button className="add-button" onClick={addNote}>
          ADD
        </button>
      </div>
      <div className="notes-list">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="note"
            style={{ backgroundColor: note.color }}
          >
            {note.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
