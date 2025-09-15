# Notes App API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

The API uses HTTP-only cookies for authentication. All protected endpoints require a valid authentication token.

### Cookie Settings

- Name: `token`
- HttpOnly: true
- Secure: true (in production)
- SameSite: strict
- Max Age: 24 hours

## API Endpoints

### Authentication

#### Register User

```http
POST /auth/register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Password Requirements:**

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%\*?&)

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Error Responses:**

- 400 Bad Request
  ```json
  {
    "message": "Invalid email format"
  }
  ```
  ```json
  {
    "message": "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  }
  ```
  ```json
  {
    "message": "User already exists"
  }
  ```
- 500 Server Error
  ```json
  {
    "message": "Database error occurred"
  }
  ```

#### Login

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Error Responses:**

- 400 Bad Request
  ```json
  {
    "message": "Invalid email format"
  }
  ```
- 401 Unauthorized
  ```json
  {
    "message": "Invalid credentials"
  }
  ```
- 500 Server Error
  ```json
  {
    "message": "Database error occurred"
  }
  ```

#### Check Authentication Status

```http
GET /auth/check
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Error Responses:**

- 401 Unauthorized
  ```json
  {
    "message": "Not authenticated"
  }
  ```
  ```json
  {
    "message": "Invalid token"
  }
  ```
  ```json
  {
    "message": "User not found"
  }
  ```

#### Logout

```http
POST /auth/logout
```

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

### Notes

#### Get All Notes

```http
GET /notes
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "My Note",
    "content": "Note content",
    "createdAt": "2024-03-27T12:00:00.000Z",
    "updatedAt": "2024-03-27T12:00:00.000Z",
    "userId": 1
  }
]
```

**Error Responses:**

- 401 Unauthorized
  ```json
  {
    "message": "Not authenticated"
  }
  ```
- 500 Server Error
  ```json
  {
    "message": "Database error occurred"
  }
  ```

#### Get Single Note

```http
GET /notes/:id
```

**Response:**

```json
{
  "id": 1,
  "title": "My Note",
  "content": "Note content",
  "createdAt": "2024-03-27T12:00:00.000Z",
  "updatedAt": "2024-03-27T12:00:00.000Z",
  "userId": 1
}
```

**Error Responses:**

- 401 Unauthorized
  ```json
  {
    "message": "Not authenticated"
  }
  ```
- 404 Not Found
  ```json
  {
    "message": "Note not found"
  }
  ```
- 500 Server Error
  ```json
  {
    "message": "Database error occurred"
  }
  ```

#### Create Note

```http
POST /notes
```

**Request Body:**

```json
{
  "title": "My Note",
  "content": "Note content"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "My Note",
  "content": "Note content",
  "createdAt": "2024-03-27T12:00:00.000Z",
  "updatedAt": "2024-03-27T12:00:00.000Z",
  "userId": 1
}
```

**Error Responses:**

- 400 Bad Request
  ```json
  {
    "message": "Title and content are required"
  }
  ```
- 401 Unauthorized
  ```json
  {
    "message": "Not authenticated"
  }
  ```
- 500 Server Error
  ```json
  {
    "message": "Database error occurred"
  }
  ```

#### Update Note

```http
PUT /notes/:id
```

**Request Body:**

```json
{
  "title": "Updated Note",
  "content": "Updated content"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Updated Note",
  "content": "Updated content",
  "createdAt": "2024-03-27T12:00:00.000Z",
  "updatedAt": "2024-03-27T12:00:00.000Z",
  "userId": 1
}
```

**Error Responses:**

- 400 Bad Request
  ```json
  {
    "message": "Title and content are required"
  }
  ```
- 401 Unauthorized
  ```json
  {
    "message": "Not authenticated"
  }
  ```
- 403 Forbidden
  ```json
  {
    "message": "Not authorized to update this note"
  }
  ```
- 404 Not Found
  ```json
  {
    "message": "Note not found"
  }
  ```
- 500 Server Error
  ```json
  {
    "message": "Database error occurred"
  }
  ```

#### Delete Note

```http
DELETE /notes/:id
```

**Response:**

```json
{
  "message": "Note deleted successfully"
}
```

**Error Responses:**

- 401 Unauthorized
  ```json
  {
    "message": "Not authenticated"
  }
  ```
- 403 Forbidden
  ```json
  {
    "message": "Not authorized to delete this note"
  }
  ```
- 404 Not Found
  ```json
  {
    "message": "Note not found"
  }
  ```
- 500 Server Error
  ```json
  {
    "message": "Database error occurred"
  }
  ```

## Frontend Integration Guide

### Setup

1. Configure axios to include credentials:

```javascript
import axios from "axios";

axios.defaults.withCredentials = true;
```

2. Set the base URL:

```javascript
const BASE_URL = "http://localhost:5000/api";
```

### Authentication Flow

1. Register a new user using `/auth/register`
2. Login using `/auth/login`
3. Check authentication status using `/auth/check`
4. Logout using `/auth/logout`

### Error Handling

- All API responses include a `message` field for error details
- Handle 401 responses by redirecting to login
- Handle 403 responses by showing appropriate error messages
- Handle 500 responses by showing a generic error message

### Best Practices

1. Always check authentication status on app load
2. Implement proper error handling for all API calls
3. Use loading states while waiting for API responses
4. Implement proper form validation before making API calls
5. Handle token expiration by redirecting to login

### Security Considerations

1. Never store sensitive data in localStorage
2. Always use HTTPS in production
3. Implement proper CSRF protection
4. Handle session expiration gracefully
5. Implement rate limiting on the frontend

### Development Setup

1. Install required dependencies:

```bash
npm install axios react-router-dom @reduxjs/toolkit react-redux
```

2. Configure environment variables:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Set up Redux store with authentication slice
4. Implement protected routes
5. Set up axios interceptors for error handling

### Common Issues

1. CORS errors: Ensure the backend has proper CORS configuration
2. Cookie issues: Ensure proper cookie settings and credentials inclusion
3. Authentication errors: Check token expiration and refresh logic
4. Network errors: Implement proper error handling and retry logic
5. State management: Ensure proper Redux setup and error handling
