import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const SurveyResponse = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/surveys/public/${surveyId}`,
        );
        if (!response.ok) {
          throw new Error("Survey not found");
        }
        const data = await response.json();
        setSurvey(data);

        const initialAnswers = {};
        data.questions.forEach((q) => {
          initialAnswers[q.id] = "";
        });
        setAnswers(initialAnswers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [surveyId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredUnanswered = survey.questions.filter(
      (q) => q.required && (!answers[q.id] || answers[q.id].trim() === ""),
    );

    if (requiredUnanswered.length > 0) {
      setError("Please answer all required questions");
      return;
    }

    try {
      setSubmitting(true);

      const formattedAnswers = survey.questions.map((q) => ({
        question_id: q.id,
        answer_text: answers[q.id],
      }));

      const response = await fetch(
        `http://127.0.0.1:8000/surveys/public/${surveyId}/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: formattedAnswers }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit survey");
      }

      setSubmitted(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-200 flex items-center justify-center">
        <div className="text-gray-400 dark:text-gray-500">
          Loading survey...
        </div>
      </div>
    );
  }

  if (error && !submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-200 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-10 max-w-md w-full text-center shadow-sm dark:shadow-none">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Error
          </h2>
          <p className="text-red-500 dark:text-red-400 mb-8 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-all duration-200 shadow-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-200 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-10 max-w-md w-full text-center shadow-sm dark:shadow-none">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-1 text-sm">
            Your response has been recorded successfully.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mb-8">
            We appreciate your feedback and input.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-all duration-200 shadow-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const answeredCount = Object.values(answers).filter(
    (a) => a.trim() !== "",
  ).length;
  const totalCount = survey?.questions.length || 0;
  const progress = totalCount > 0 ? (answeredCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-200 py-10 px-4">
      {/* Theme toggle */}
      <div className="max-w-2xl mx-auto flex justify-end mb-4">
        <ThemeToggle />
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm dark:shadow-none">
          {/* Survey Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1.5">
              {survey?.title}
            </h1>
            {survey?.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {survey.description}
              </p>
            )}
          </div>

          {/* Survey Form */}
          <form onSubmit={handleSubmit} className="space-y-7">
            {survey?.questions.map((question, index) => (
              <div
                key={question.id}
                className="border-b border-gray-100 dark:border-gray-800 pb-7 last:border-b-0"
              >
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    {index + 1}.
                  </span>{" "}
                  {question.text}
                  {question.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {/* Text type */}
                {question.type === "text" && (
                  <textarea
                    value={answers[question.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    placeholder="Enter your answer here..."
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-400 dark:placeholder-gray-600 resize-none transition-all duration-200"
                    rows="4"
                    required
                  />
                )}

                {/* Rating type */}
                {question.type === "rating" && (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() =>
                          handleAnswerChange(question.id, num.toString())
                        }
                        className={`w-11 h-11 rounded-lg text-base font-bold transition-all duration-200 ${
                          answers[question.id] === num.toString()
                            ? "bg-purple-600 text-white shadow-sm"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                )}

                {/* Multiple choice type */}
                {question.type === "multiple_choice" && question.options && (
                  <div className="space-y-2">
                    {question.options.split(",").map((option, i) => (
                      <label
                        key={i}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                          answers[question.id] === option.trim()
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-500/10 text-gray-900 dark:text-white"
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option.trim()}
                          checked={answers[question.id] === option.trim()}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                          className="mr-3 accent-purple-600"
                        />
                        <span className="text-sm">{option.trim()}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Default to text if type is missing */}
                {!question.type && (
                  <textarea
                    value={answers[question.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    placeholder="Enter your answer here..."
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-400 dark:placeholder-gray-600 resize-none transition-all duration-200"
                    rows="4"
                    required
                  />
                )}
              </div>
            ))}

            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-medium transition-all duration-200 shadow-sm"
              >
                {submitting ? "Submitting..." : "Submit Survey"}
              </button>
              <button
                type="reset"
                onClick={() => {
                  const emptyAnswers = {};
                  survey?.questions.forEach((q) => {
                    emptyAnswers[q.id] = "";
                  });
                  setAnswers(emptyAnswers);
                }}
                className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-sm"
              >
                Clear All
              </button>
            </div>
          </form>
        </div>

        {/* Progress indicator */}
        <div className="mt-5 px-1">
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mb-1.5">
            <span>
              {answeredCount} of {totalCount} answered
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1">
            <div
              className="bg-purple-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyResponse;
