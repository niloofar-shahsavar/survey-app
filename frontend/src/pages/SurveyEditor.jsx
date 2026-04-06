import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import API_BASE from "../config/api";

const SurveyEditor = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("text");
  const [newQuestionOptions, setNewQuestionOptions] = useState("");
  const [newQuestionRequired, setNewQuestionRequired] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRequired, setEditRequired] = useState(true);
  const [editType, setEditType] = useState("text");
  const [editOptions, setEditOptions] = useState("");
  const [copied, setCopied] = useState(false);
  const [aiGoal, setAiGoal] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_BASE}/surveys/${surveyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          navigate("/dashboard");
          return;
        }

        const data = await response.json();
        setSurvey(data);
        setQuestions(data.questions || []);
        setIsPublished(Boolean(data.published || data.is_published));
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
        `${API_BASE}/surveys/${surveyId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: newQuestion,
            type: newQuestionType,
            options: newQuestionOptions || null,
            required: newQuestionRequired,
          }),
        },
      );

      if (response.ok) {
        const question = await response.json();
        setQuestions([...questions, question]);
        setNewQuestion("");
        setNewQuestionType("text");
        setNewQuestionOptions("");
        setNewQuestionRequired(true);
      }
    } catch (err) {
      console.error("Error adding question:", err);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE}/surveys/${surveyId}/questions/${questionId}`,
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

  const handleEditQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE}/surveys/${surveyId}/questions/${questionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: editText,
            type: editType,
            options: (editType === "multiple_choice" || editType === "multi_select") ? editOptions || null : null,
            required: editRequired,
          }),
        },
      );

      if (response.ok) {
        const updated = await response.json();
        setQuestions(
          questions.map((q) =>
            q.id === questionId ? { ...q, text: updated.text, type: updated.type, options: updated.options, required: updated.required } : q,
          ),
        );
        setEditingId(null);
        setEditText("");
        setEditType("text");
        setEditOptions("");
      }
    } catch (err) {
      console.error("Error editing question:", err);
    }
  };

  const handleShareLink = () => {
    const link = `${window.location.origin}/survey/${surveyId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateAI = async () => {
    if (!aiGoal.trim()) return;
    setAiLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await fetch(`${API_BASE}/ai/generate-questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ goal: aiGoal }),
      });

      const data = await response.json();
      if (data.questions) {
        // Clean the response (remove markdown code blocks if present)
        let cleanJson = data.questions.trim();
        if (cleanJson.startsWith("```")) {
          cleanJson = cleanJson.replace(/```json?\n?/g, "").replace(/```/g, "");
        }

        const parsed = JSON.parse(cleanJson);

        for (const question of parsed) {
          await fetch(`${API_BASE}/surveys/${surveyId}/questions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              text: question.text,
              type: question.type || "text",
              options: question.options || null,
              required: true,
            }),
          });
        }

        // Refresh survey
        const surveyResponse = await fetch(`${API_BASE}/surveys/${surveyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const surveyData = await surveyResponse.json();
        setQuestions(surveyData.questions || []);
        setAiGoal("");
      }
    } catch (err) {
      console.error("Error generating questions:", err);
    } finally {
      setAiLoading(false);
    }
  };

  const handlePublish = () => {
    setIsPublished(true);
    setShowPublishModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-200 flex items-center justify-center">
        <div className="text-gray-400 dark:text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-200">
      <nav className="flex justify-between items-center px-8 py-4 bg-white dark:bg-transparent border-b border-gray-200 dark:border-gray-800/50">
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          Survii
        </div>
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

      <main className="max-w-3xl mx-auto px-8 py-8">
        <div className="flex justify-between items-start mb-7">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {survey?.title || "Untitled Survey"}
            </h1>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-0.5">
              {questions.length} questions
            </p>
          </div>
          <div className="flex gap-2">
            {isPublished && (
              <button
                onClick={handleShareLink}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm transition-all duration-200"
              >
                {copied ? "Copied!" : "Share Link"}
              </button>
            )}
            <Link
              to={`/results/${surveyId}`}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm transition-all duration-200"
            >
              View Results
            </Link>
            <Link
              to={`/statistics/${surveyId}`}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm transition-all duration-200"
            >
              Statistics
            </Link>
            <button
              onClick={handlePublish}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm ${
                isPublished
                  ? "bg-green-600 hover:bg-green-500 text-white"
                  : "bg-purple-600 hover:bg-purple-500 text-white"
              }`}
            >
              {isPublished ? "Published" : "Publish"}
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-3 mb-5">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex justify-between items-center hover:border-purple-300 dark:hover:border-purple-500/20 transition-all duration-200"
            >
              {editingId === question.id ? (
                <div className="flex-1 mr-4">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  />
                  <div className="flex items-center gap-3 mt-2">
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="px-3 py-2 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-sm transition-all duration-200"
                    >
                      <option value="text">Text</option>
                      <option value="rating">Rating</option>
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="multi_select">Multi Select</option>
                    </select>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`required-${question.id}`}
                        checked={editRequired}
                        onChange={(e) => setEditRequired(e.target.checked)}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <label
                        htmlFor={`required-${question.id}`}
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        Required
                      </label>
                    </div>
                  </div>
                  {(editType === "multiple_choice" || editType === "multi_select") && (
                    <input
                      type="text"
                      placeholder="Options (comma-separated): Option A, Option B, Option C"
                      value={editOptions}
                      onChange={(e) => setEditOptions(e.target.value)}
                      className="w-full mt-2 px-3 py-2 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-400 dark:placeholder-gray-600 text-sm transition-all duration-200"
                    />
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditQuestion(question.id)}
                      className="px-3 py-1.5 text-sm bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditText("");
                        setEditType("text");
                        setEditOptions("");
                      }}
                      className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-3 items-start flex-1">
                    <span className="text-gray-300 dark:text-gray-700 mt-1">
                      ⋮⋮
                    </span>
                    <div>
                      <p className="text-xs text-purple-500/70 dark:text-purple-400/70 mb-0.5 font-medium uppercase tracking-wide">
                        Q{index + 1} · {question.type}
                        {question.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </p>
                      <p className="text-gray-800 dark:text-gray-200">
                        {question.text}
                      </p>
                      {question.options && (question.type === "multiple_choice" || question.type === "multi_select") && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {question.options.split(",").map((opt, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 text-xs bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20 rounded-full"
                            >
                              {opt.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(question.id);
                        setEditText(question.text);
                        setEditRequired(question.required);
                        setEditType(question.type || "text");
                        setEditOptions(question.options || "");
                      }}
                      className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="px-3 py-1.5 text-sm text-red-500 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* AI Generation */}
        <div className="mb-4 bg-purple-50 dark:bg-purple-500/5 border border-purple-200 dark:border-purple-500/20 p-5 rounded-xl">
          <p className="text-sm text-purple-700 dark:text-purple-400 font-medium mb-3">
            ✨ Generate with AI
          </p>
          <input
            type="text"
            placeholder="Describe your survey goal (e.g., customer satisfaction, employee feedback)"
            value={aiGoal}
            onChange={(e) => setAiGoal(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-400 dark:placeholder-gray-600 transition-all duration-200"
          />
          <button
            onClick={handleGenerateAI}
            disabled={!aiGoal.trim() || aiLoading}
            className="w-full mt-3 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 text-white rounded-lg font-medium transition-all duration-200 shadow-sm"
          >
            {aiLoading ? "Generating..." : "Generate 5 Questions"}
          </button>
        </div>

        {/* Manual Add Question */}
        <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
          <input
            type="text"
            placeholder="Type your question here..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-400 dark:placeholder-gray-600 transition-all duration-200"
          />
          <div className="flex gap-2 mt-3">
            <select
              value={newQuestionType}
              onChange={(e) => setNewQuestionType(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-all duration-200"
            >
              <option value="text">Text</option>
              <option value="rating">Rating</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="multi_select">Multi Select</option>
            </select>
            <button
              onClick={handleAddQuestion}
              disabled={!newQuestion.trim()}
              className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 text-white rounded-lg font-medium transition-all duration-200 shadow-sm"
            >
              + Add Question
            </button>
          </div>
          {(newQuestionType === "multiple_choice" ||
            newQuestionType === "multi_select") && (
            <input
              type="text"
              placeholder="Options (comma-separated): Option A, Option B, Option C"
              value={newQuestionOptions}
              onChange={(e) => setNewQuestionOptions(e.target.value)}
              className="w-full mt-3 px-4 py-2.5 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-400 dark:placeholder-gray-600 transition-all duration-200"
            />
          )}
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              id="required"
              checked={newQuestionRequired}
              onChange={(e) => setNewQuestionRequired(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded"
            />
            <label
              htmlFor="required"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Required question
            </label>
          </div>
        </div>
      </main>

      {showPublishModal && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-xl max-w-md w-full mx-4 text-center shadow-xl">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Survey is Live!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Share this link to start collecting responses
            </p>

            <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 p-3 rounded-lg mb-4 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/survey/${surveyId}`}
                className="flex-1 bg-transparent text-gray-700 dark:text-gray-300 text-sm outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/survey/${surveyId}`,
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition-all duration-200"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <button
              onClick={() => setShowPublishModal(false)}
              className="w-full py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyEditor;
