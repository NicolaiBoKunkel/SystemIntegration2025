As part of the hand-in for assignment 11a, here is my documentation for the setup process that i followed.

# Firebase Authentication with React & TypeScript

This project demonstrates how to integrate Firebase Authentication into a React app using TypeScript. Users can sign up, log in, and log out using email and password.

---

## Overview

This is a simple authentication frontend that integrates with [Firebase Authentication](https://firebase.google.com/docs/auth). It meets the assignment criteria of using a federated identity provider and allows new users to register and existing users to log in using email/password credentials.

---

## Tech Stack

- **React** (with TypeScript)
- **Firebase Authentication**
- **Vite** (for fast dev server and build)

---

## Step-by-Step Setup Guide

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** Follow the setup steps
3. After the project is created, go to **Build > Authentication**
4. Click **Get Started** and enable **Email/Password** authentication

---

### 2. Get Firebase SDK Config

1. In the Firebase Console, click the **Project Settings**
2. Scroll down to **Your apps**, click **</>** (Web)
3. Register your app and copy the **Firebase config object**:
   ```ts
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MSG_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

---

### 3. Create a New React + TS App + Firebase SDK
In my case:
npm create vite@latest firebase-auth-demo -- --template react-ts
cd firebase-auth-demo
npm install
npm install firebase

---

### 4. Create Firebase Config
Create a file: src/firebase.ts and replace the values with the Firebase config object from the firebase website when setting up the project

---

### 5. Create and pass a frontend component
Create a file like i did at: src/AuthForm.tsx, which will handle the frontend and pass it to App.tsx

---

### 6. Test the app
Run npm start (in my case) or the correct command depending on your setup

