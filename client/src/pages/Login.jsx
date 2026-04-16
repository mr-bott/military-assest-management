import { useState } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post(`${API}/auth/login`, {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    localStorage.setItem("role", res.data.user.role);

    localStorage.setItem("base", res.data.user.base);

    window.location.href = "/dashboard";
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Military Login</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>
        <p>admin</p>
        <p>Admin: admin@mail.com Password:123456</p>
        <p>Logistics</p>
        <p>Logistics: log@mail.com Password:123456</p>
        <p>Commanders or Bases</p>
        <p>Alpha: alpha@mail.com Password:123456</p>
        <p>Beta: beta@mail.com Password:123456</p>
        <p>Campa: campa@mail.com Password:123456</p>
      </div>
    </div>
  );
}
