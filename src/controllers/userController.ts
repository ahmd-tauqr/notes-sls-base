import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { signUp, signIn } from '../services/userService';

export const signUpController = async (req: Request, res: Response) => {
  try {
    const user = await signUp(req.body);
    res.status(201).send(user);
  } catch (error) {
    const err = error as Error;
    res.status(400).send({ error: err.message });
  }
};

export const signInController = async (req: Request, res: Response) => {
  try {
    const {id, email} = await signIn(req.body.email, req.body.password);
    const token = jwt.sign({ id, email}, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    const err = error as Error;
    res.status(400).send({ error: err.message });
  }
};