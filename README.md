# Week 15: Note Taking App with Auth

## Authentication and Protected Routes

## Introduction

- You have learned how to implement Redux Toolkit with your note taking app project, now we're going one step further and adding authentication, a way to protect your notes from the public.

### Task 1: Project Setup

1. Create a forked copy of this project.
2. Clone your OWN version of the repository in your terminal
3. CD into the project base directory `cd Week15_NoteTakingApp_Auth`
4. First, set up the server:
   ```bash
   cd server
   npm install
   npm start
   ```
5. Open a new terminal window and set up the client:
   ```bash
   # Make sure you're in the project root directory
   npm install
   npm run dev
   ```
6. Create a new branch: git checkout -b `<firstName-lastName>`. Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
7. Push commits: git push origin `<firstName-lastName>`.

### Important Note About Ports and CORS

The server is configured to accept requests from any localhost port, so you don't need to worry about CORS issues if your React app runs on a different port. Here's how it works:

1. The server runs on port 3001 by default
2. Your React app can run on any port (Vite typically uses 5173, Create React App uses 3000)
3. The CORS configuration automatically allows any localhost port
4. If you need to change the server port, you can:
   - Set it in the environment: `PORT=3002 npm start`
   - Or modify the `PORT` constant in `server/index.js`

If you're still experiencing CORS issues:

1. Make sure your API calls are using the correct server URL (e.g., `http://localhost:3001/api/notes`)
2. Check that you're not using `https` for local development
3. Verify that both server and client are running

### API Documentation

For detailed information about the API endpoints and how to use them, please refer to the [API_DOCUMENTATION.md](API_DOCUMENTATION.md) file included in this project. This document provides comprehensive details on the available endpoints, request/response formats, and any additional information you might need to interact with the API effectively.

### Task 2: Setup Authentication and Protected Routes

To complete this project, you are required to implement the full authentication flow and protected routing. You must modify the following files:

- **src/App.jsx**:

  - Import and use your `ProtectedRoute` component.
  - Set up all routes using React Router.
  - Ensure only authenticated users can access protected pages (e.g., notes, create note).
  - Redirect users to login/register if not authenticated, and to notes if already authenticated.
  - Add the Navbar.

- **src/components/ProtectedRoute.jsx**:

  - Implement all logic for route protection.
  - Use Redux to check if the user is authenticated.
  - Redirect users as appropriate (e.g., to login if not authenticated, to notes if already authenticated).
  - Handle loading states.

- **src/pages/Login.jsx**:

  - Implement the login form using `react-hook-form` and `zod` for validation.
  - Connect the form to Redux for authentication.
  - Handle form submission, loading, and error states.
  - Redirect to notes page on successful login.

- **src/pages/Register.jsx**:

  - Implement the registration form using `react-hook-form` and `zod` for validation.
  - Connect the form to Redux for authentication.
  - Handle form submission, loading, and error states.
  - Redirect to notes page on successful registration.

- **src/store/slices/authSlice.js**:

  - Implement Redux logic for authentication:
    - Thunks for login, register, logout, and checking authentication status.
    - Reducers for handling authentication state, loading, and errors.

- **src/components/Navbar.jsx**:
  - Implement navigation using React Router's Link component.
  - Show/hide links based on authentication state (e.g., show login/register if not logged in, show logout if logged in).

---

### Task 4: Stretch Goals

#### Advanced Authentication Features

- [ ] Implement password reset functionality:

  - Add a "Forgot Password" link on the login page.
  - Create a password reset request form.
  - Implement email sending for password reset links.
  - Create a password reset confirmation page.

- [ ] Add email verification:

  - Send a verification email upon registration.
  - Implement a verification link that confirms the user's email.
  - Prevent access to certain features until the email is verified.

- [ ] Integrate social login:

  - Allow users to log in using Google, Facebook, or other social platforms.
  - Implement OAuth flow for social login.
  - Store social login tokens securely.

- [ ] Implement two-factor authentication (2FA):

  - Add 2FA setup during registration or in user settings.
  - Implement a 2FA verification step during login.
  - Use a time-based one-time password (TOTP) for 2FA.

- [ ] Enhance session management:
  - Implement token refresh logic to keep users logged in.
  - Add session timeout and automatic logout.
  - Allow users to view and manage active sessions.

## Submission Format

- [ ] Submit a Pull-Request to merge `<firstName-lastName>` Branch into `main` (student's Repo). **Please don't merge your own pull request**
