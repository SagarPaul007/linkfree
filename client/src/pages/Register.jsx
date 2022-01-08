import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = (e) => {
    e.preventDefault();

    const options = {
      url: "http://localhost:5000/api/register",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        name,
        username,
        email,
        password,
      },
    };

    axios(options).then((res) => {
      const data = res.data;
      alert(data.message);
    });
  };

  return (
    <div className="register">
      <form>
        <div className="form-heading">
          <h2>Register User</h2>
        </div>
        <div className="form-control">
          <label>Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            name="name"
          />
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
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            name="email"
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
        <button onClick={registerUser} type="submit" className="btn">
          Register
        </button>

        <div className="form-footer">
          <p>
            Alreday have an account? <Link to="/login">login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
