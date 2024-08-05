import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteProps, NotesState } from "./types";

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<NoteProps>) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    pinNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) note.pinned = !note.pinned;
    },
    editNote: (state, action: PayloadAction<NoteProps>) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
  },
});

export const { addNote, deleteNote, pinNote, editNote } = notesSlice.actions;

export default notesSlice.reducer;
