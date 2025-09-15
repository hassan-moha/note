import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNote from "./pages/CreateNote";
import ViewNotes from "./pages/ViewNotes";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {  checkAuthStatus } from './store/slices/authSlice'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
  
          <Routes>
            <Route path="/login" element={
              <ProtectedRoute requireAuth={false} >
              <Login />
            </ProtectedRoute>
              } />

            <Route path="/register" element={
              <ProtectedRoute requireAuth={false} >
              <Register />
            </ProtectedRoute>
              } />

            <Route path="/notes" element={
              <ProtectedRoute requireAuth={true}>
              <ViewNotes />
              </ProtectedRoute>
              } />

            <Route path="/" element={
              <ProtectedRoute requireAuth={true}>
               <CreateNote />
              </ProtectedRoute>
            }/>
          </Routes>
      </main>
    </div>
  );
};

export default App;
