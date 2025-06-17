import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Adjust path if needed

const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      borderBottom: "1px solid #ccc"
    }}>
      {/* Logo/Brand on the left */}
      <Link to="/" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        AI Learning Platform
      </Link>

      {/* Links on the right */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {/* Dashboard is always visible */}
        <Link to="/dashboard">Dashboard</Link>

        {!user && (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
        {user && !isAdmin && (
          <>
            <Link to="/history">History</Link>
            <span>{user.name}</span>
            <button onClick={logout}>Sign Out</button>
          </>
        )}
        {user && isAdmin && (
          <>
            <Link to="/admin">Admin</Link>
            <span>{user.name}</span>
            <button onClick={logout}>Sign Out</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;