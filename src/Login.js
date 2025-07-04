import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setToken }) {
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (username, password) => {
    setAuthLoading(true);
    setAuthError("");

    const response = await fetch("https://x9kfjw-8080.csb.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setAuthLoading(false);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setAuthError(data.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-red-50 rounded-lg border border-red-200">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-red-600">
        Login
      </h2>
      {authError && (
        <div className="mb-3 text-center text-black-600 font-semibold">
          {authError}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(username, password);
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=" p-3
          border-2
          border-red-300
          rounded
          w-full
          mb-4
          focus:outline-none
          focus:ring-2
          focus:ring-red-400"
          placeholder="Username"
        />
        <input
          type="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" p-3
          border-2
          border-red-300
          rounded
          w-full
          mb-4
          focus:outline-none
          focus:ring-2
          focus:ring-red-400"
          placeholder="Password"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 hover:bg-red-600 font-bold text-white rounded w-full transition-color duration-200 "
        >
          {authLoading ? "Loggin in...." : "Login"}
        </button>
      </form>
      <div className="mt-5 text-center text-gray-700">
        Don't have an account?
        <Link to="/signup">
          <span className="text-red-500 hover:underline font-semibold">
            Signup
          </span>
        </Link>
      </div>
    </div>
  );
}
