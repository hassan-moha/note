import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

// TODO: Implement checkAuthStatus thunk
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    // TODO: Implement authentication status check
    try {
       // 1. Make a GET request to /auth/check
       const response = await axios.get(`${BASE_URL}/auth/check`)
       // 2. Return the response data
       return response.data.user
    }catch(err) {
      // 3. Handle errors appropriately
      throw err
    }
  }
);

// TODO: Implement login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    // TODO: Implement login functionality
    try {
      // 1. Make a POST request to /auth/login with credentials
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials)
      // 2. Return the response data
       return response.data;

    }catch(error) {
      // 3. Handle errors appropriately
      if(error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
    } 
  }
);

// TODO: Implement register thunk
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    // TODO: Implement registration functionality
    try {
      console.log("DATA", userData)
      // 1. Make a POST request to /auth/register with userData
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      console.log('RESPONSE', response)
      // 2. Return the response data
      return response.data;
      
    }catch(error) {
      // 3. Handle errors appropriately
      if(error.response?.data?.error) {
        throw new Error(error.response.data.error)
    }
    throw error;
  }
  }
);

// TODO: Implement logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    // TODO: Implement logout functionality
     await axios.post(`${BASE_URL}/auth/logout`)
    // 1. Make a POST request to /auth/logout
    // 2. Handle errors appropriately
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    // TODO: Add cases for checkAuthStatus
          .addCase(checkAuthStatus.pending, (status) => {
            state.status = "loading"
          })
          .addCase(checkAuthStatus.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.isAuthenticated = true
            state.user = action.payload
            state.error = null
          })
          .addCase(checkAuthStatus.rejected, (state, action) => {
            state.status ="idle"
            state.isAuthenticated = false
            state.user = null
          })
    // TODO: Add cases for login
          .addCase(login.pending, (state) => {
            state.status = 'loading'
            state.error = null;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.isAuthenticated = true
            state.user = action.payload
            state.error = null;
          })
          .addCase(login.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })

    // TODO: Add cases for register
          .addCase(register.pending, (state) => {
            state.status = 'loading'
            state.error = null
          })
          .addCase(register.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
          })
          .addCase(register.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })
    // TODO: Add cases for logout
         .addCase(logout.pending, (state) => {
          state.status = 'adile';
          state.isAuthenticated = false;
          state.user = null;
          state.error = null;
         })
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
