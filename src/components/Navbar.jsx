import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Navbar() {
  const { isAuth, logout } = useAuth();

  return (
    <header className="w-full bg-indigo-700 shadow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Texto estático en vez de Link */}
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
              <Link to="/users" className="text-white hover:text-indigo-200">
                Usuarios
              </Link>
              <button
                onClick={logout}
                className="ml-4 rounded bg-white/20 px-4 py-1 text-white hover:bg-white/40 transition"
              >
                Salir
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
