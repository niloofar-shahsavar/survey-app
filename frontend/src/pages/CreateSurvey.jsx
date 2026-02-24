import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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
        navigate("/Login");
        return;
      }

      const response = await fetch("http://localhost:8000/surveys/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || "Failed to create survey");
      }

      const survey = await response.json();
      navigate(`/editor/${survey.id}`);
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b">
        <div className="text-2xl font-bold text-purple-900">Survii</div>
        <Link to="/dashboard" className="text-gray-500 hover:text-purple-600">
          ← Back to Dashboard
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Create New Survey
        </h1>
        <p className="text-gray-500 mb-8">
          Give your survey a title and description.
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg border"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Survey Title
            </label>
            <input
              type="text"
              placeholder="e.g., Customer Satisfaction Survey"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full h-32 p-3 border rounded-lg text-gray-700 focus:outline-none focus:border-purple-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !title}
            className="w-full mt-4 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {loading ? "Creating..." : "Create Survey"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateSurvey;
