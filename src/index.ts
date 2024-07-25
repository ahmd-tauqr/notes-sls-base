import express from 'express';
import bodyParser from 'body-parser';
import { getNote, createNote, updateNote, deleteNote } from './controllers/noteController';
import { signUpController, signInController } from './controllers/userController';
import { authMiddleware } from './middlewares/authMiddleware';
import { logger } from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(logger);

// User routes
app.post('/signup', signUpController);
app.post('/signin', signInController);

// Note routes
app.get('/notes/:id', authMiddleware, getNote);
app.post('/notes', authMiddleware, createNote);
app.put('/notes/:id', authMiddleware, updateNote);
app.delete('/notes/:id', authMiddleware, deleteNote);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// Export the app for serverless
module.exports.handler = require('serverless-http')(app);