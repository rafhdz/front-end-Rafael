import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";

// Mockea el useAuth para controlar el estado de autenticación
vi.mock("../../auth/AuthProvider", () => ({
  useAuth: () => ({
    isAuth: false,
    logout: vi.fn(),
  }),
}));

describe("Navbar", () => {
  it('muestra "Login" cuando no está autenticado', () => {
    render(<Navbar />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/mi biblioteca/i)).toBeInTheDocument();
  });
});
