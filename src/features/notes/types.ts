export interface NoteProps {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  image?: string;
  color?: string;
}

export interface EditNoteProps {
  noteId: string;
  onClose: () => void;
}

export interface NotesState {
  notes: NoteProps[];
}
