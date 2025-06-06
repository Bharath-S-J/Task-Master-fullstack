# Task Master

Task Master is a full-stack task management application built with **TypeScript**, **CSS** **React**, and **Firebase** on the frontend, and a separate **Node.js + Express** backend to handle scheduled reminder emails.

## Features

### ✅ Frontend (React + Vite + Firebase)
- Built in **TypeScript** using **Vite**
- Firebase Authentication:
  - Signup, Login, Logout
  - Email verification
  - Forgot password & reset password flows
- CRUD operations for tasks (Create, Read, Update, Delete)
- Task reminder with alert + audio notification
- Protected routes based on auth state
- Real-time, multi-device synchronization of tasks and reminders via Firestore
- Responsive UI

### 📬 Backend (Node.js + Express + Firebase Admin SDK)
- Runs independently from frontend
- Every minute, checks for tasks with reminders scheduled ±30 seconds from current time
- Sends email reminders via **nodemailer**
- Reads tasks directly from Firestore using a Firebase service account
- Supports `.env` configuration for secrets and email credentials

---

## Technologies Used

- React + TypeScript
- Firebase (Authentication, Firestore, Hosting)
- Vite
- Node.js + Express
- Nodemailer
- dotenv
- Firebase Admin SDK

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-master.git
cd task-master
```

---

## Frontend Setup (`client/`)

### Install dependencies

```bash
cd client
npm install
```

### Set up environment variables

Create a `.env` file in `client/`:

```env
# client/.env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Run the frontend locally

```bash
npm run dev
```

---

## Backend Setup (`server/`)

### Install dependencies

```bash
cd server
npm install
```

### Set up environment variables

Create a `.env` file in `server/`:

```env
# server/.env
PORT=3000

FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json

EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
```

> ⚠️ Do not commit your `.env` or `serviceAccountKey.json` files.

### Add Firebase Admin SDK service account

Place your `serviceAccountKey.json` in the `server/` folder.

[Get it from Firebase Console > Project Settings > Service accounts](https://console.firebase.google.com/)

### Run the backend

```bash
npm run start
```

It will check for due reminders every minute and send email notifications automatically.

---

## Deployment

You can deploy the frontend using Firebase Hosting or any static host like Vercel/Netlify.

For backend, you can deploy to:

* **Render**
* **Railway**
* **Fly.io**
* **EC2 / VPS**
* Or Dockerize it for cloud deployment

---


