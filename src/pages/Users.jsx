import { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Lista de usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.UsuarioID || user.id}>
            {user.NombreUsuario || user.username} —{" "}
            {user.CorreoElectronico || user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
