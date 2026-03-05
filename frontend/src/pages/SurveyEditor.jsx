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

  const handleAddQuestion = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/surveys/${surveyId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: newQuestion }),
        },
      );

      if (response.ok) {
        const question = await response.json();
        setQuestions([...questions, question]);
        setNewQuestion("");
      }
    } catch (err) {
      console.error("Error adding question:", err);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/surveys/${surveyId}/questions/${questionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        setQuestions(questions.filter((q) => q.id !== questionId));
      }
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b">
        <div className="text-2xl font-bold text-purple-900">Survii</div>
        <Link to="/dashboard" className="text-gray-500 hover:text-purple-600">
          ← Back to Dashboard
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-8 py-8">
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
                className="bg-white p-4 rounded-lg border flex justify-between items-center group"
              >
                <div className="flex gap-3 items-start flex-1">
                  <span className="text-gray-300 mt-1 cursor-grab">⋮⋮</span>
                  <div className="flex-1">
                    <p className="text-sm text-purple-500 font-medium mb-1">
                      Question {index + 1}
                    </p>
                    <p className="text-gray-800">{question.text}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm text-gray-600 border rounded hover:bg-gray-100">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteQuestion(question.id)} className="px-3 py-1 text-sm text-red-500 border border-red-200 rounded hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 bg-white p-4 rounded-lg border">
          <input
            type="text"
            placeholder="Type your question here..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:border-purple-400"
          />
          <button
            onClick={handleAddQuestion}
            disabled={!newQuestion.trim()}
            className="w-full mt-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
          >
            + Add Question
          </button>
        </div>
      </main>
    </div>
  );
};

export default SurveyEditor;
