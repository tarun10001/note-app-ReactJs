import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import Note from "./Note";
import { addNote } from "../features/notes/notesSlice";
import { NoteProps as NoteType } from "../features/notes/types";
import { MdLightbulbOutline } from "react-icons/md";

const NoteList: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    savedNotes.forEach((note: NoteType) => {
      if (!notes.find((n) => n.id === note.id)) {
        dispatch(addNote(note));
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const pinnedNotes = notes.filter((note) => note.pinned);
  const othersNotes = notes.filter((note) => !note.pinned);
  return (
    <>
      {notes.length > 0 ? (
        <div className="note-list">
          <h2>Pinned</h2>

          <div className="pinned-notes">
            {pinnedNotes.length > 0 ? (
              pinnedNotes.map((note) => <Note key={note.id} {...note} />)
            ) : (
              <p>No pinned notes</p>
            )}
          </div>
          <h2>Others</h2>
          <div className="other-notes">
            {othersNotes.length > 0 ? (
              othersNotes.map((note) => <Note key={note.id} {...note} />)
            ) : (
              <p>No other notes</p>
            )}
          </div>
        </div>
      ) : (
        <div className="notes-appear">
          <MdLightbulbOutline className="notes-appear-bulb" />
          <h1 className="notes-appear-heading">
            Notes that you add appear here
          </h1>
        </div>
      )}
    </>
  );
};

export default NoteList;
