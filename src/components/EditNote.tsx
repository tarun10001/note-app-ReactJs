import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNote } from "../features/notes/notesSlice";
import { RootState } from "../app/store";
import { NoteProps as NoteType } from "../features/notes/types";
import { EditNoteProps } from "../features/notes/types";

const EditNote: React.FC<EditNoteProps> = ({ noteId, onClose }) => {
  const dispatch = useDispatch();
  const note = useSelector((state: RootState) =>
    state.notes.notes.find((n) => n.id === noteId)
  );
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [color, setColor] = useState(note?.color || "");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    if (note) {
      const updatedNote: NoteType = {
        ...note,
        title,
        content,
        color,
      };
      dispatch(editNote(updatedNote));
      onClose();
    }
  };

  return (
    <div className="edit-note" style={{ backgroundColor: color }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ backgroundColor: color }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ backgroundColor: color }}
      />
      <div className="edit-btn-container">
        <button onClick={handleSave}>Save Changes</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditNote;
