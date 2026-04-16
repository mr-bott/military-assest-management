import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">

        <div className="topbar">
          <h2>Military Asset Management</h2>

          <button
            className="logout"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>

        <div className="content">
          {children}
        </div>

      </div>
    </div>
  );
}