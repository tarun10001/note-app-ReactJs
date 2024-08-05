import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../features/notes/notesSlice";
import { v4 as uuidv4 } from "uuid";

const AddNote: React.FC = () => {
  const [openContainer, setOpenContainer] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  const noteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (content) {
      const newNote = {
        id: uuidv4(),
        title,
        content,
        pinned: false,
        image,
        color,
      };
      dispatch(addNote(newNote));

      const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
      savedNotes.push(newNote);
      localStorage.setItem("notes", JSON.stringify(savedNotes));

      setTitle("");
      setContent("");
      setImage("");
      setColor("");
      setOpenContainer(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (noteRef.current && !noteRef.current.contains(event.target as Node)) {
      setOpenContainer(false);
    }
  };

  useEffect(() => {
    if (openContainer) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openContainer]);

  return (
    <>
      {!openContainer && (
        <div
          className="add-note-wrapper"
          onClick={() => setOpenContainer(true)}
        >
          <input
            type="text"
            placeholder="Take a note..."
            value={title}
            ref={inputRef}
          />
        </div>
      )}
      {openContainer && (
        <div className="add-note" ref={noteRef}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Take a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div className="color-picker">
            <span>Pick color for your Note</span>
            <input
              type="color"
              name="favcolor"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button className="add-btn" onClick={handleSubmit}>
              Add Note
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNote;
