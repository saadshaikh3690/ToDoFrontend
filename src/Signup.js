import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async (username, password) => {
    setAuthLoading(true);
    setAuthError("");
    setSuccess(false);
    const response = await fetch("https://x9kfjw-8080.csb.app/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setAuthLoading(false);
    if (data.message === "User registered") {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setAuthError(data.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-red-50 rounded-xl shadow-lg border border-red-200">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-red-600">
        Sign Up
      </h2>
      {authError && (
        <div className="mb-3 text-center text-black-600 font-semibold">
          {authError}
        </div>
      )}
      {success && (
        <div className="mb-3 text-center text-orange-600 font-semibold">
          Registration successful! Redirecting to login...
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup(username, password);
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 border-2 border-red-300 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Username"
        />
        <input
          type="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border-2 border-red-300 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Password"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded w-full transition-colors duration-200"
          disabled={authLoading}
        >
          {authLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div className="mt-5 text-center">
        <span className="text-gray-700">Already have an account? </span>
        <Link
          to="/login"
          className="text-red-600 hover:underline font-semibold"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
