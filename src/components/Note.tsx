import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNote, pinNote } from "../features/notes/notesSlice";
import { BsFillPinFill } from "react-icons/bs";
import EditNote from "./EditNote";
import { NoteProps } from "../features/notes/types";

const Note: React.FC<NoteProps> = ({
  id,
  title,
  content,
  pinned,
  image,
  color,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <div style={{ backgroundColor: color }} className="note-card">
      <div className="note-card-header">
        {title && <h2>{title}</h2>}
        {pinned && <BsFillPinFill />}
      </div>
      <p>{content}</p>
      {image && <img src={image} alt="Note" className="note-card-img" />}
      <div className="note-card-btns">
        <button onClick={() => dispatch(pinNote(id))}>
          {pinned ? "Unpin" : "Pin"}
        </button>
        {!isEditing && (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={() => dispatch(deleteNote(id))}>Delete</button>
      </div>
      {isEditing && <EditNote noteId={id} onClose={handleCloseEdit} />}
    </div>
  );
};

export default Note;
