import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Navbar() {
  const { isAuth, logout } = useAuth();

  return (
    <header className="w-full bg-indigo-700 shadow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div>
          <span className="text-xl font-bold text-white">Mi Biblioteca</span>
        </div>

        <div className="flex gap-6">
          {!isAuth && (
            <Link to="/login" className="text-white hover:text-indigo-200">
              Login
            </Link>
          )}
          {isAuth && (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-indigo-200"
              >
                Dashboard
              </Link>
              <button
                className="text-white hover:text-indigo-200"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
