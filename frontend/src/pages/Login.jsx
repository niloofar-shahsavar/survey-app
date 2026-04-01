import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import API_BASE from "../config/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || "Login failed");
        return;
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);
      navigate("/dashboard");
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-200 flex flex-col">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-200 dark:border-gray-800/50">
        <Link
          to="/"
          className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-500 dark:hover:text-purple-300 transition-colors duration-200"
        >
          ← Back
        </Link>
        <ThemeToggle />
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Survii</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back</p>
          </div>

          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm dark:shadow-none">
            {error && (
              <div className="mb-5 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-400 dark:placeholder-gray-600 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-400 dark:placeholder-gray-600 transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-medium transition-all duration-200 shadow-sm mt-1"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="text-center text-gray-500 dark:text-gray-500 text-sm mt-5">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
