
import { Link } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div className="sidebar">

      <h3>Menu</h3>

      <Link to="/dashboard">Dashboard</Link>

      {(role === "admin" ||
        role === "logistics") && (
        <>
          <Link to="/purchases">
            Purchases
          </Link>

          <Link to="/transfers">
            Transfers
          </Link>
        </>
      )}

      {(role === "admin" ||
        role === "commander") && (
        <Link to="/assignments">
          Assignments
        </Link>
      )}

      <div className="rolebox">
        Logged in as: {role}
      </div>
    </div>
  );
}