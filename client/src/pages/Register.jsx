import React from "react";

const Register = () => {
  return (
    <div className="register">
      <form>
        <div className="form-heading">
          <h2>Register User</h2>
        </div>
        <div className="form-control">
          <label for="name">Name</label>
          <input type="text" required name="name" />
        </div>
        <div className="form-control">
          <label for="username">Username</label>
          <input type="text" required name="username" />
        </div>
        <div className="form-control">
          <label for="email">Email</label>
          <input type="email" required name="email" />
        </div>
        <div className="form-control">
          <label for="password">Password</label>
          <input type="password" required name="password" />
        </div>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
