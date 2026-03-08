// src/pages/LoginPage.jsx
import React, { useState } from "react";

const LoginPage = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <form onSubmit={submitForm} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;