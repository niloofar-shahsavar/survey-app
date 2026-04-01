import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import API_BASE from "../config/api";

function CreateSurvey() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_BASE}/surveys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || "Failed to create survey");
        return;
      }

      const surveyData = await response.json();
      navigate(`/editor/${surveyData.id}`);
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-200">
      <nav className="flex justify-between items-center px-8 py-4 bg-white dark:bg-transparent border-b border-gray-200 dark:border-gray-800/50">
        <div className="text-xl font-bold text-gray-900 dark:text-white">Survii</div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/dashboard"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Survey</h1>
          <p className="text-gray-500 dark:text-gray-500 mt-1">Give your survey a title and description.</p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-7 shadow-sm dark:shadow-none">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Survey Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full text-xl font-semibold px-4 py-3 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-300 dark:placeholder-gray-700 transition-all duration-200"
              />
            </div>
            <div>
              <textarea
                placeholder="Add a description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-400 dark:placeholder-gray-600 resize-none transition-all duration-200"
                rows="3"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !title}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 text-white rounded-lg font-medium transition-all duration-200 shadow-sm"
            >
              {loading ? "Creating..." : "Create Survey"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateSurvey;
