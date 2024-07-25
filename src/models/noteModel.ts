import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE as string;

export const getNote = async (id: string) => {
  const params = {
    TableName,
    Key: { id },
  };

  const result = await dynamoDb.get(params).promise();
  return result.Item;
};

export const createNote = async (note: any) => {
  const params = {
    TableName,
    Item: note,
  };

  await dynamoDb.put(params).promise();
  return note;
};

export const updateNote = async (id: string, note: any) => {
  const params = {
    TableName,
    Key: { id },
    UpdateExpression: 'set content = :content',
    ExpressionAttributeValues: {
      ':content': note.content,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  await dynamoDb.update(params).promise();
  return note;
};

export const deleteNote = async (id: string) => {
  const params = {
    TableName,
    Key: { id },
  };

  await dynamoDb.delete(params).promise();
};