# Task Manager

A full-stack task manager where users can create an account, sign in, and manage their personal tasks.

## Features

- User registration and login with JWT authentication
- Passwords hashed with bcrypt
- Create, view, update, and delete tasks
- Mark tasks complete or incomplete
- Each user can access only their own tasks

## Tech stack

- Frontend: React and Axios
- Backend: Node.js and Express
- Database: MongoDB with Mongoose
- Authentication: JSON Web Tokens and bcrypt

## Requirements

- Node.js and npm
- A MongoDB connection URI

## Run locally

### Backend

Create `backend/.env` with your MongoDB connection URI and a private JWT secret:

```env
MONGO_URI=your-mongodb-connection-uri
JWT_SECRET=your-long-random-secret
PORT=5000
```

Then install dependencies and start the API:

```bash
cd backend
npm install
npm run dev
```

The API runs at `http://localhost:5000` by default.

### Frontend

Set the backend URL in `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

In a separate terminal, install dependencies and start the app:

```bash
cd frontend
npm install
npm start
```

The frontend runs at `http://localhost:3000` by default. Restart it after changing `.env`.

## API

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/auth/register` | Register an account | No |
| POST | `/api/auth/login` | Sign in | No |
| GET | `/api/tasks` | List your tasks | Yes |
| POST | `/api/tasks` | Create a task | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |
