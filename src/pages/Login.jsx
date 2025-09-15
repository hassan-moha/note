import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { loginSchema } from "../schema/authSchema";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as loginUser } from "../store/slices/authSlice";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const { 
    register: registerFeild, 
    handleSubmit, 
    formState: {errors}
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    }
  })

  const onLogin = async (data) => {
    try {
      console.log(data)
      const resolt = await dispatch(loginUser(data));
      console.log(resolt)
      // if(loginUser.fulfilled.match(resolt)) {
      //   navigate('/notes')
      // } else {
      //   console.error('login Failed', resolt.payload)
      // }
    } catch(error) {
      console.log(error)
    }
  };
  

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...registerFeild('email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Enter your email"
            />

          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...registerFeild('password')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-yellow-600 hover:text-yellow-500">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
