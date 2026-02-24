import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function CreateSurvey() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateSurvey = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Create survey
      const response = await fetch("http://localhost:8001/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title || "Untitled Survey",
          description: description,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || "Failed to create survey");
        return;
      }

      const surveyData = await response.json();
      
      // Redirect to survey editor with the new survey ID
      navigate(`/survey-editor?id=${surveyData.id}`);
    } catch (err) {
      setError("Error creating survey");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
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
          Create a survey to gather feedback and insights.
        </p>

        <div className="bg-white p-6 rounded-lg border">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleCreateSurvey}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Survey Title
              </label>
              <input
                type="text"
                placeholder="e.g., Customer Feedback Survey"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Description (Optional)
              </label>
              <textarea
                placeholder="Describe the purpose of this survey..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-32 p-3 border rounded-lg text-gray-700 focus:outline-none focus:border-purple-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
            >
              {loading ? "Creating Survey..." : "Create Survey"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-sm mt-4">
          You can add questions after creating the survey
        </p>
      </main>
    </div>
  );
}

export default CreateSurvey;
