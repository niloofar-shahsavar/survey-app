import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const SurveyEditor = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:8000/surveys/${surveyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          navigate("/dashboard");
          return;
        }

        const data = await response.json();
        setSurvey(data);
        setQuestions(data.questions || []);
      } catch (err) {
        console.error("Error fetching survey:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [surveyId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b">
        <div className="text-2xl font-bold text-purple-900">Survii</div>
        <Link to="/dashboard" className="text-gray-500 hover:text-purple-600">
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {survey?.title || "Untitled Survey"}
            </h1>
            <p className="text-gray-500 text-sm">
              {questions.length} questions
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Publish
            </button>
          </div>
        </div>

        {/* Questions List */}
        {questions.length === 0 ? (
          <div className="bg-white p-8 rounded-lg border text-center">
            <p className="text-gray-500">
              No questions yet. Add your first question!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="bg-white p-4 rounded-lg border flex justify-between items-center"
              >
                <div className="flex gap-3 items-start">
                  <span className="text-gray-400 mt-1">⋮⋮</span>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      Question {index + 1}
                    </p>
                    <p className="text-gray-800">{question.text}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-purple-600">
                    ✏️
                  </button>
                  <button className="text-gray-400 hover:text-red-500">
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Question */}
        <button className="w-full mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-purple-400 hover:text-purple-600">
          + Add Question
        </button>
      </main>
    </div>
  );
};

export default SurveyEditor;
