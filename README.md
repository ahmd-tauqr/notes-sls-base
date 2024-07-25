# Notes Serverless Application

This project is a serverless application built with Node.js, Express, and TypeScript. It uses AWS Lambda, API Gateway, and DynamoDB. The application includes user authentication (sign-up and sign-in) and CRUD operations for notes.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Endpoints](#endpoints)
- [Testing with Postman](#testing-with-postman)
- [Project Structure](#project-structure)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later)
- Serverless Framework (v4.x)
- AWS CLI (configured with appropriate permissions)

## Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ahmd.tauqr/notes-sls-base.git
   cd notes-sls-base
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build the project:**

   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```
PORT=3000
JWT_SECRET=your_jwt_secret
AWS_REGION=your_aws_region
DYNAMODB_TABLE=notesTable
DYNAMODB_USER_TABLE=usersTable
```

Replace `your_jwt_secret` and `your_aws_region` with appropriate values.

## Deployment

To deploy the application using the Serverless Framework, run:

```bash
serverless deploy
```

After deployment, you will get URLs for the API endpoints.

## Endpoints

### User Authentication

- **Sign Up:**
  - **URL:** `POST /signup`
  - **Headers:** `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "id": "user1",
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- **Sign In:**
  - **URL:** `POST /signin`
  - **Headers:** `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### Notes

- **Create Note:**
  - **URL:** `POST /notes`
  - **Headers:**
    - `Content-Type: application/json`
    - `Authorization: Bearer YOUR_JWT_TOKEN`
  - **Body:**
    ```json
    {
      "id": "1",
      "content": "This is a test note"
    }
    ```

- **Get Note:**
  - **URL:** `GET /notes/{id}`
  - **Headers:**
    - `Authorization: Bearer YOUR_JWT_TOKEN`

- **Update Note:**
  - **URL:** `PUT /notes/{id}`
  - **Headers:**
    - `Content-Type: application/json`
    - `Authorization: Bearer YOUR_JWT_TOKEN`
  - **Body:**
    ```json
    {
      "content": "This is an updated test note"
    }
    ```

- **Delete Note:**
  - **URL:** `DELETE /notes/{id}`
  - **Headers:**
    - `Authorization: Bearer YOUR_JWT_TOKEN`

## Testing with Postman

1. **Sign Up:**
   - Create a new POST request in Postman.
   - URL: `https://your-api-id.execute-api.your-region.amazonaws.com/dev/signup`
   - Headers: `Content-Type: application/json`
   - Body:
     ```json
     {
       "id": "user1",
       "email": "user@example.com",
       "password": "password123"
     }
     ```

2. **Sign In:**
   - Create a new POST request in Postman.
   - URL: `https://your-api-id.execute-api.your-region.amazonaws.com/dev/signin`
   - Headers: `Content-Type: application/json`
   - Body:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - Copy the JWT token from the response.

3. **Create Note:**
   - Create a new POST request in Postman.
   - URL: `https://your-api-id.execute-api.your-region.amazonaws.com/dev/notes`
   - Headers:
     - `Content-Type: application/json`
     - `Authorization: Bearer YOUR_JWT_TOKEN`
   - Body:
     ```json
     {
       "id": "1",
       "content": "This is a test note"
     }
     ```

4. **Get Note:**
   - Create a new GET request in Postman.
   - URL: `https://your-api-id.execute-api.your-region.amazonaws.com/dev/notes/1`
   - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`

5. **Update Note:**
   - Create a new PUT request in Postman.
   - URL: `https://your-api-id.execute-api.your-region.amazonaws.com/dev/notes/1`
   - Headers:
     - `Content-Type: application/json`
     - `Authorization: Bearer YOUR_JWT_TOKEN`
   - Body:
     ```json
     {
       "content": "This is an updated test note"
     }
     ```

6. **Delete Note:**
   - Create a new DELETE request in Postman.
   - URL: `https://your-api-id.execute-api.your-region.amazonaws.com/dev/notes/1`
   - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`

## Project Structure

```
notes-sls-base/
├── src/
│   ├── controllers/
│   │   ├── noteController.ts
│   │   └── userController.ts
│   ├── middlewares/
│   │   └── authMiddleware.ts
│   ├── models/
│   │   ├── noteModel.ts
│   │   └── userModel.ts
│   ├── services/
│   │   ├── noteService.ts
│   │   └── userService.ts
│   ├── utils/
│   │   └── logger.ts
│   ├── index.ts
├── .env
├── .gitignore
├── package.json
├── serverless.yml
├── tsconfig.json
└── webpack.config.js
```

## Conclusion

This project demonstrates how to build a serverless application with user authentication and note CRUD operations using Node.js, Express, TypeScript, AWS Lambda, API Gateway, and DynamoDB. By following the steps outlined in this README, you can set up, deploy, and test the application. If you encounter any issues or have questions, feel free to open an issue or contact the author.