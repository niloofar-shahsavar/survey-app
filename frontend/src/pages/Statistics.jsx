import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import API_BASE from "../config/api";

const Statistics = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiData, setAiData] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${API_BASE}/surveys/${surveyId}/statistics`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!response.ok) {
          navigate("/dashboard");
          return;
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [surveyId, navigate]);

  const fetchAiAnalysis = async () => {
    setAiLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE}/ai/${surveyId}/ai-analysis`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.ok) {
        const result = await response.json();
        setAiData(result.analysis);
      }
    } catch (err) {
      console.error("Error fetching AI analysis:", err);
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-200 flex items-center justify-center">
        <div className="text-gray-400 dark:text-gray-500">
          Loading statistics...
        </div>
      </div>
    );
  }

  const getBarWidth = (count, maxCount) => {
    if (maxCount === 0) return 0;
    return (count / maxCount) * 100;
  };

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
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {data?.survey_title || "Survey Statistics"}
          </h1>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-0.5">
            Analytics and insights
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {data?.total_responses || 0}
            </div>
            <div className="text-gray-500 dark:text-gray-500 text-xs mt-1 uppercase tracking-wide">
              Responses
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {data?.questions?.length || 0}
            </div>
            <div className="text-gray-500 dark:text-gray-500 text-xs mt-1 uppercase tracking-wide">
              Questions
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {data?.overall_avg_rating || "—"}
            </div>
            <div className="text-gray-500 dark:text-gray-500 text-xs mt-1 uppercase tracking-wide">
              Avg Rating
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {data?.questions?.filter((q) => q.type !== "text").length || 0}
            </div>
            <div className="text-gray-500 dark:text-gray-500 text-xs mt-1 uppercase tracking-wide">
              Chart Questions
            </div>
          </div>
        </div>
        {/* AI Analysis Section */}
        {data?.total_responses > 0 && (
          <div className="bg-white dark:bg-gray-900/50 border border-purple-200 dark:border-purple-500/20 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-purple-700 dark:text-purple-400 font-medium">
                  ✨ AI Analysis
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
                  Powered by Gemini
                </p>
              </div>
              {!aiData && (
                <button
                  onClick={fetchAiAnalysis}
                  disabled={aiLoading}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white text-sm rounded-lg transition-all duration-200"
                >
                  {aiLoading ? "Analyzing..." : "Generate Analysis"}
                </button>
              )}
            </div>

            {aiLoading && (
              <div className="text-center py-8">
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  AI is analyzing your responses...
                </p>
              </div>
            )}

            {aiData && (
              <div className="space-y-5">
                {/* Summary */}
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                    Summary
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 text-sm">
                    {aiData.summary}
                  </p>
                </div>

                {/* Sentiment */}
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                    Overall Sentiment
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      aiData.sentiment === "positive"
                        ? "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400"
                        : aiData.sentiment === "negative"
                          ? "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400"
                          : "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                    }`}
                  >
                    {aiData.sentiment}
                  </span>
                </div>

                {/* Key Findings */}
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
                    Key Findings
                  </p>
                  <div className="space-y-2">
                    {aiData.key_findings?.map((finding, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-purple-500 dark:text-purple-400 mt-0.5 text-sm">
                          •
                        </span>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {finding}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
                    Recommendations
                  </p>
                  <div className="space-y-2">
                    {aiData.recommendations?.map((rec, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-green-500 dark:text-green-400 mt-0.5 text-sm">
                          →
                        </span>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {rec}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notable Patterns */}
                {aiData.notable_patterns && (
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                      Notable Patterns
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {aiData.notable_patterns}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {data?.total_responses === 0 ? (
          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-1">
              No responses yet
            </p>
            <p className="text-gray-400 dark:text-gray-600 text-sm">
              Share your survey link to start collecting data.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {data?.questions.map((question, index) => (
              <div
                key={question.question_id}
                className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm dark:shadow-none"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex-1">
                    <p className="text-xs text-purple-500/70 dark:text-purple-400/70 font-medium uppercase tracking-wide mb-1">
                      Q{index + 1} · {question.type.replace("_", " ")}
                    </p>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {question.text}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                    {question.total_answers} answers
                  </span>
                </div>

                {/* Rating Visualization */}
                {question.type === "rating" && question.distribution && (
                  <div>
                    {/* Average + Median */}
                    <div className="flex gap-6 mb-5">
                      <div>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {question.average}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500 text-sm ml-1">
                          / 5 avg
                        </span>
                      </div>
                      <div>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {question.median}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500 text-sm ml-1">
                          median
                        </span>
                      </div>
                    </div>

                    {/* Star Distribution Bars */}
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count =
                          question.distribution[String(rating)] || 0;
                        const maxCount = Math.max(
                          ...Object.values(question.distribution),
                        );
                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 dark:text-gray-400 w-4 text-right">
                              {rating}
                            </span>
                            <div className="flex-1 h-7 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                              <div
                                className="h-full bg-purple-500 dark:bg-purple-600 rounded-md transition-all duration-500"
                                style={{
                                  width: `${getBarWidth(count, maxCount)}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Multiple Choice Visualization */}
                {question.type === "multiple_choice" &&
                  question.option_counts && (
                    <div className="space-y-2">
                      {Object.entries(question.option_counts)
                        .sort(([, a], [, b]) => b - a)
                        .map(([option, count]) => {
                          const percentage =
                            question.option_percentages[option] || 0;
                          const maxCount = Math.max(
                            ...Object.values(question.option_counts),
                          );
                          return (
                            <div key={option} className="group">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {option}
                                </span>
                                <span className="text-sm text-gray-400 dark:text-gray-500">
                                  {percentage}% ({count})
                                </span>
                              </div>
                              <div className="h-7 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                                <div
                                  className="h-full bg-purple-500 dark:bg-purple-600 rounded-md transition-all duration-500"
                                  style={{
                                    width: `${getBarWidth(count, maxCount)}%`,
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}

                {/* Multi Select Visualization */}
                {question.type === "multi_select" && question.option_counts && (
                  <div className="space-y-2">
                    {Object.entries(question.option_counts)
                      .sort(([, a], [, b]) => b - a)
                      .map(([option, count]) => {
                        const percentage =
                          question.option_percentages[option] || 0;
                        const maxCount = Math.max(
                          ...Object.values(question.option_counts),
                        );
                        return (
                          <div key={option} className="group">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {option}
                              </span>
                              <span className="text-sm text-gray-400 dark:text-gray-500">
                                {percentage}% ({count})
                              </span>
                            </div>
                            <div className="h-7 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                              <div
                                className="h-full bg-indigo-500 dark:bg-indigo-600 rounded-md transition-all duration-500"
                                style={{
                                  width: `${getBarWidth(count, maxCount)}%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">
                      Respondents could select multiple options
                    </p>
                  </div>
                )}

                {/* Text Responses */}
                {question.type === "text" && (
                  <div>
                    <div className="flex gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-800/60 px-4 py-2 rounded-lg">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {question.avg_word_count}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500 text-xs ml-1">
                          avg words
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {question.responses?.map((response, i) => (
                        <div
                          key={i}
                          className="px-4 py-3 bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                        >
                          "{response}"
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Statistics;
