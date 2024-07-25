import { Request, Response } from 'express';
import { fetchNote, fetchAllNotes, addNote, modifyNote, removeNote, searchUserNotes } from '../services/noteService';

export const getNote = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const noteId = req.params.id;
  const note = await fetchNote(userId, noteId);
  if (!note) {
    return res.status(404).send({ error: 'Note not found' });
  }
  res.send(note);
};

export const getAllNotes = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const notes = await fetchAllNotes(userId);
  res.send(notes);
};

export const createNote = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const note = { ...req.body, userId };
  const newNote = await addNote(note);
  res.status(201).send(newNote);
};

export const updateNote = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const noteId = req.params.id;
  const note = { ...req.body };
  const updatedNote = await modifyNote(userId, noteId, note);
  res.send(updatedNote);
};

export const deleteNote = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const noteId = req.params.id;
  const note = await fetchNote(userId, noteId);
  if (!note) {
    return res.status(404).send({ error: 'Note not found' });
  }
  await removeNote(userId, noteId);
  res.sendStatus(204);
};

export const searchNotes = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const searchString = req.query.q as string;
  const notes = await searchUserNotes(userId, searchString);
  res.send(notes);
};