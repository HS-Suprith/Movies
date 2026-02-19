# SupX Movies

A Netflix-style streaming platform with sign-in, authentication, and a browse landing page. User credentials are stored securely in **Aiven PostgreSQL**.

## Features

- **Sign In / Sign Up** – Create an account or sign in with existing credentials
- **Netflix-style Landing Page** – Hero section and scrollable content rows
- **Aiven Database** – User credentials stored in PostgreSQL with hashed passwords

## Setup

### 1. Aiven PostgreSQL

1. Create an [Aiven](https://aiven.io/) account and provision a PostgreSQL service
2. From the service overview, note:
   - Host
   - Port
   - Database name
   - User
   - Password
3. Download the **CA certificate** from the overview and save as `ca.pem` in the project root

### 2. Environment

Copy the example env file and fill in your Aiven details:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```
DATABASE_USER=avnadmin
DATABASE_PASSWORD=your_password
DATABASE_HOST=your-project-pg-12345.aivencloud.com
DATABASE_PORT=12345
DATABASE_NAME=defaultdb
DATABASE_CA_PATH=./ca.pem
PORT=3001
```

### 3. Install Dependencies

```bash
npm run install:all
```

### 4. Run the App

```bash
npm run dev
```

- **Frontend**: http://localhost:5173  
- **API**: http://localhost:3001  

## Project Structure

```
SupX_Movies/
├── client/           # React frontend (Vite)
│   └── src/
│       ├── pages/
│       │   ├── SignIn.jsx   # Login / Signup
│       │   └── Browse.jsx   # Netflix-style landing
│       └── App.jsx
├── server/           # Express API
│   ├── db.js         # Aiven PostgreSQL connection
│   ├── index.js      # API server
│   └── routes/
│       └── auth.js   # Sign in / Sign up endpoints
├── .env.example
└── package.json
```

## API Endpoints

| Method | Endpoint       | Description                    |
|--------|----------------|--------------------------------|
| POST   | `/api/auth/signup` | Create account             |
| POST   | `/api/auth/signin` | Sign in                   |

## Security

- Passwords are hashed with **bcrypt** before storage
- SSL/TLS used for database connections
- Never commit `.env` or `ca.pem` – they are in `.gitignore`
