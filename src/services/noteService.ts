import { getNoteById, getAllNotesByUser, createNote, updateNote, deleteNote, searchNotes } from '../models/noteModel';

export const fetchNote = async (userId: string, noteId: string) => {
  return await getNoteById(userId, noteId);
};

export const fetchAllNotes = async (userId: string) => {
  return await getAllNotesByUser(userId);
};

export const addNote = async (note: any) => {
  return await createNote(note);
};

export const modifyNote = async (userId: string, noteId: string, note: any) => {
  return await updateNote(userId, noteId, note);
};

export const removeNote = async (userId: string, noteId: string) => {
  await deleteNote(userId, noteId);
};

export const searchUserNotes = async (userId: string, searchString: string) => {
  return await searchNotes(userId, searchString);
};