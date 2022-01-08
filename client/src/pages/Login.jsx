import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();

    const options = {
      url: "http://localhost:5000/api/login",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        username,
        password,
      },
    };

    axios(options).then((res) => {
      console.log(res);
      const { status, message, token } = res.data;
      alert(message);
      if (status === "ok") {
        localStorage.setItem("auth-token", token);
      }
    });
  };

  return (
    <div className="register">
      <form>
        <div className="form-heading">
          <h2>Log In</h2>
        </div>

        <div className="form-control">
          <label>Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            required
            name="username"
          />
        </div>

        <div className="form-control">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            name="password"
          />
        </div>
        <button onClick={loginUser} type="submit" className="btn">
          Log in
        </button>
        <div className="form-footer">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
