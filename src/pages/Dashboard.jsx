import { useAuth } from "../auth/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Bienvenido, {user?.username || user?.nombre || "usuario"}</h2>
      <p>Dashboard general.</p>
    </div>
  );
}
