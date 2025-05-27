import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import api from "../api/axiosClient";

export default function Dashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ username: "", correo: "" });
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    correo: "",
  });
  const [loading, _] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const startEdit = (u) => {
    setEditingId(u.UsuarioID || u.id);
    setForm({
      username: u.NombreUsuario || u.username,
      correo: u.CorreoElectronico || u.email || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ username: "", correo: "" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${editingId}`, {
        username: form.username.trim(),
        correo: form.correo.trim() || null,
      });
      cancelEdit();
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", {
        username: newUser.username.trim(),
        password: newUser.password.trim(),
        correo: newUser.correo.trim() || null,
      });
      setNewUser({ username: "", password: "", correo: "" });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="page-container">
      <h2>Bienvenido, {user?.username || user?.nombre || "usuario"}</h2>
      <p>Dashboard general.</p>

      <hr style={{ margin: "1.5rem 0" }} />

      <h3>Agregar nuevo usuario</h3>
      <form onSubmit={handleCreate} style={{ marginBottom: "2rem" }}>
        <input
          placeholder="Usuario"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
          style={input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
          style={input}
        />
        <input
          placeholder="Correo (opcional)"
          value={newUser.correo}
          onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
          style={input}
        />
        <button type="submit">Crear usuario</button>
      </form>

      <h3>Usuarios</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Cargando...</p>}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Usuario</th>
            <th style={th}>Correo</th>
            <th style={th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) =>
            editingId === (u.UsuarioID || u.id) ? (
              <tr key={u.UsuarioID || u.id}>
                <td style={td}>{u.UsuarioID || u.id}</td>
                <td style={td}>
                  <input
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />
                </td>
                <td style={td}>
                  <input
                    value={form.correo}
                    onChange={(e) =>
                      setForm({ ...form, correo: e.target.value })
                    }
                  />
                </td>
                <td style={td}>
                  <button onClick={handleUpdate}>Guardar</button>{" "}
                  <button onClick={cancelEdit}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={u.UsuarioID || u.id}>
                <td style={td}>{u.UsuarioID || u.id}</td>
                <td style={td}>{u.NombreUsuario || u.username}</td>
                <td style={td}>{u.CorreoElectronico || u.email}</td>
                <td style={td}>
                  <button onClick={() => startEdit(u)}>Editar</button>{" "}
                  <button onClick={() => handleDelete(u.UsuarioID || u.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  borderBottom: "2px solid #ddd",
  padding: "0.5rem",
};

const td = {
  borderBottom: "1px solid #eee",
  padding: "0.5rem",
};

const input = {
  marginRight: "0.5rem",
  marginBottom: "0.5rem",
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
};
