import { getNote, createNote, updateNote, deleteNote } from '../models/noteModel';

export const fetchNote = async (id: string) => {
  return await getNote(id);
};

export const addNote = async (note: any) => {
  return await createNote(note);
};

export const modifyNote = async (id: string, note: any) => {
  return await updateNote(id, note);
};

export const removeNote = async (id: string) => {
  await deleteNote(id);
};