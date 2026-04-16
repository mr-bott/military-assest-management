
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Transfers from "./pages/Transfers";
import Assignments from "./pages/Assignments";
import Layout from "./components/Layout";
import "./App.css";

function Protected({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <Protected>
              <Layout>
                <Dashboard />
              </Layout>
            </Protected>
          }
        />

        <Route
          path="/purchases"
          element={
            <Protected>
              <Layout>
                <Purchases />
              </Layout>
            </Protected>
          }
        />

        <Route
          path="/transfers"
          element={
            <Protected>
              <Layout>
                <Transfers />
              </Layout>
            </Protected>
          }
        />

        <Route
          path="/assignments"
          element={
            <Protected>
              <Layout>
                <Assignments />
              </Layout>
            </Protected>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}