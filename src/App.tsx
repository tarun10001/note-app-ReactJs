import React from "react";
import "./App.css";
import AddNote from "./components/AddNote";
import NoteList from "./components/NoteList";

function App() {
  return (
    <>
      <AddNote />
      <NoteList />
    </>
  );
}

export default App;
