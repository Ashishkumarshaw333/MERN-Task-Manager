# Task Manager (MERN Stack)

A full-stack task manager where users can sign up and log in (JWT authentication), then add, edit, delete, and complete their personal tasks.

## Tech Stack
- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas - free cloud)
- **Auth:** JWT (JSON Web Tokens) + bcrypt password hashing

## Features
- User signup & login with hashed passwords (bcrypt)
- JWT-based authentication (protected routes)
- Create, Read, Update, Delete (CRUD) tasks
- Each user can only see their own tasks
- Mark task complete/incomplete
- Login persists across page refreshes

## Setup Instructions

### 1. MongoDB Atlas setup (free)
1. Create an account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0 tier)
3. Create a database user (username/password)
4. Allow your current IP address under Network Access
5. Copy the connection string from "Connect" > "Drivers"

### 2. Backend setup
```bash
cd backend
npm install
Copy-Item .env.example .env
```
Open the `.env` file and set `MONGO_URI` to your MongoDB Atlas Drivers connection string (starting with `mongodb+srv://`), then set the database username/password and cluster host. URL-encode reserved characters such as `@`, `:`, or `/` in the password. Allow your current IP in Atlas Network Access. Replace `JWT_SECRET` with a long random value.

```bash
npm run dev
```
The server will run at `http://localhost:5000`.

### 3. Frontend setup
In a new terminal:
```bash
cd frontend
npm install
npm start
```
The app will open at `http://localhost:3000`.

## Project Structure
```
task-manager/
├── backend/
│   ├── models/        # Mongoose schemas (User, Task)
│   ├── routes/         # API routes (auth, tasks)
│   ├── middleware/      # JWT auth middleware
│   └── server.js       # Entry point
└── frontend/
    └── src/
        ├── components/  # Login, Register, TaskList
        ├── api.js       # Axios instance with auto token attach
        └── App.js       # Main component (routing logic)
```

## API Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login | No |
| GET | /api/tasks | Get all of your tasks | Yes |
| POST | /api/tasks | Create a new task | Yes |
| PUT | /api/tasks/:id | Update a task | Yes |
| DELETE | /api/tasks/:id | Delete a task | Yes |

## Important concepts to understand
- **How JWT works:** During signup or login, the server returns a signed token containing the encoded userId. The frontend sends this token in the "Authorization" header with every request. The backend middleware (`middleware/auth.js`) verifies the token before processing the request.
- **Password security:** Passwords are never stored as plain text; they are hashed with `bcrypt` (`pre("save")` hook in `models/User.js`).
- **Data isolation:** Each Task document has a `user` field identifying its owner, so users cannot see one another's tasks (see the `{ user: req.userId }` filter in `routes/tasks.js`).
