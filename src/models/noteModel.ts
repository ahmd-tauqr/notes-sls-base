import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE as string;

export const getNoteById = async (userId: string, noteId: string) => {
  const params = {
    TableName,
    Key: { userId, noteId },
  };

  const result = await dynamoDb.get(params).promise();
  return result.Item;
};

export const getAllNotesByUser = async (userId: string) => {
  const params = {
    TableName,
    IndexName: 'userId-index',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  };

  const result = await dynamoDb.query(params).promise();
  return result.Items;
};

export const createNote = async (note: any) => {
  note.noteId = uuidv4();
  const params = {
    TableName,
    Item: note,
  };

  await dynamoDb.put(params).promise();
  return note;
};

export const updateNote = async (userId: string, noteId: string, note: any) => {
  const params = {
    TableName,
    Key: { userId, noteId },
    UpdateExpression: 'set title = :title, content = :content',
    ExpressionAttributeValues: {
      ':title': note.title,
      ':content': note.content,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  await dynamoDb.update(params).promise();
  return note;
};

export const deleteNote = async (userId: string, noteId: string) => {
  const params = {
    TableName,
    Key: { userId, noteId },
  };

  await dynamoDb.delete(params).promise();
};

export const searchNotes = async (userId: string, searchString: string) => {
  const params = {
    TableName,
    IndexName: 'userId-index',
    KeyConditionExpression: 'userId = :userId',
    FilterExpression: 'contains(title, :searchString) or contains(content, :searchString)',
    ExpressionAttributeValues: {
      ':userId': userId,
      ':searchString': searchString,
    },
  };

  const result = await dynamoDb.query(params).promise();
  return result.Items;
};