"use client";

import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 201) {
        // Display success message
        setSuccess(true);
        setError("");
      } else {
        const data = await response.json();
        setError(data.error || "Signup failed. Please try again.");
        setSuccess(false);
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        {success && (
          <p>
            Signup successful! You can now <a href="/auth/signin">sign in</a>.
          </p>
        )}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
