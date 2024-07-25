import { Request, Response } from 'express';
import { fetchNote, addNote, modifyNote, removeNote } from '../services/noteService';

export const getNote = async (req: Request, res: Response) => {
  const note = await fetchNote(req.params.id);
  res.send(note);
};

export const createNote = async (req: Request, res: Response) => {
  const note = await addNote(req.body);
  res.status(201).send(note);
};

export const updateNote = async (req: Request, res: Response) => {
  const note = await modifyNote(req.params.id, req.body);
  res.send(note);
};

export const deleteNote = async (req: Request, res: Response) => {
  await removeNote(req.params.id);
  res.sendStatus(204);
};