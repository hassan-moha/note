import {
  Sticker as Sticky,
  Plus,
  List,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()).unwrap(), navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-yellow-600 font-bold text-xl"
          >
            <Sticky size={24} />
            <span>Sticky Notes</span>
          </Link>

          <div className="flex gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                    pathname === "/"
                      ? "bg-yellow-100 text-yellow-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Plus size={18} />
                  <span>Create</span>
                </Link>

                <Link
                  to="/notes"
                  className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                    pathname === "/notes"
                      ? "bg-yellow-100 text-yellow-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <List size={18} />
                  <span>View All</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:bg-gray-100 text-gray-700"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
              <Link
                to="/login"
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  pathname === "/login"
                    ? "bg-yellow-100 text-yellow-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
               <Link
              to="/register"
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                pathname === "/register"
                  ? "bg-yellow-100 text-yellow-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <UserPlus size={18} />
              <span>Register</span>
            </Link>
            </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
