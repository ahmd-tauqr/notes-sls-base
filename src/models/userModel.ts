import AWS from 'aws-sdk';
import bcrypt from 'bcryptjs';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_USER_TABLE as string;

export const getUserByEmail = async (email: string) => {
  const params = {
    TableName,
    IndexName: 'email-index',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  const result = await dynamoDb.query(params).promise();
  return result.Items ? result.Items[0] : null;
};

export const createUser = async (user: any) => {
  const params = {
    TableName,
    Item: user,
  };

  await dynamoDb.put(params).promise();
  return user;
};

export const validatePassword = (inputPassword: string, storedPassword: string) => {
  return bcrypt.compareSync(inputPassword, storedPassword);
};

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};