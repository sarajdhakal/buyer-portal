# Buyer Portal

A buyer portal with JWT authentication and a favourites system.

**Tech Stack:** MongoDB, Express.js, React (Vite), Node.js

---

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB running locally (default: `mongodb://localhost:27017`)

### Backend Setup

```bash
cd backend
npm install
node server.js 
```

Server runs on `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:3000` and proxies API calls to the backend.

---

## Environment Variables

| Variable     | Description                  | Default                                    |
| ------------ | ---------------------------- | ------------------------------------------ |
| `PORT`       | Backend server port          | `5000`                                     |
| `MONGO_URI`  | MongoDB connection string    | `mongodb://localhost:27017/buyer-portal`    |
| `JWT_SECRET` | Secret key for signing JWTs  | `secret key`          |

---

## API Endpoints

| Method | Endpoint                      | Auth | Description              |
| ------ | ----------------------------- | ---- | ------------------------ |
| POST   | `/api/auth/register`          | No   | Register a new user      |
| POST   | `/api/auth/login`             | No   | Login, returns JWT       |
| GET    | `/api/me`                     | Yes  | Get current user profile |
| GET    | `/api/favourites`             | Yes  | List user's favourites   |
| POST   | `/api/favourites`             | Yes  | Add a favourite          |
| DELETE | `/api/favourites/:propertyId` | Yes  | Remove a favourite       |

---

## Example Flow

### 1. Register a user
### 2. Login
### 3. Add a favourite
### 4. List favourites
### 5. Remove a favourite
