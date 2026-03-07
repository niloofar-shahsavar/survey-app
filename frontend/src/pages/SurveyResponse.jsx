import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SurveyResponse = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch survey data from API
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

        // Initialize answers object
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

  // Handle answer change
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Submit survey response
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all answers are filled
    const allFilled = Object.values(answers).every(
      (answer) => answer.trim() !== "",
    );
    if (!allFilled) {
      setError("Please answer all questions");
      return;
    }

    try {
      setSubmitting(true);

      // Format answers for API
      const formattedAnswers = survey.questions.map((q) => ({
        question_id: q.id,
        answer_text: answers[q.id],
      }));

      const response = await fetch(
        `http://127.0.0.1:8000/surveys/public/${surveyId}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: formattedAnswers,
          }),
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading survey...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success/Thank you state
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Thank You!</h2>
          <p className="text-gray-600 mb-2">
            Your response has been recorded successfully.
          </p>
          <p className="text-gray-600 mb-6">
            We appreciate your feedback and input.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Survey form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Survey Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {survey?.title}
            </h1>
            {survey?.description && (
              <p className="text-gray-600 text-lg">{survey.description}</p>
            )}
          </div>

          {/* Survey Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {survey?.questions.map((question, index) => (
              <div key={question.id} className="border-b pb-6 last:border-b-0">
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  <span className="text-indigo-600 font-bold">
                    {index + 1}.
                  </span>{" "}
                  {question.text}
                </label>

                {/* Text type */}
                {question.type === "text" && (
                  <textarea
                    value={answers[question.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    placeholder="Enter your answer here..."
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
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
                        className={`w-12 h-12 rounded-lg text-lg font-bold transition ${
                          answers[question.id] === num.toString()
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition ${
                          answers[question.id] === option.trim()
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-300 hover:border-gray-400"
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
                          className="mr-3"
                        />
                        {option.trim()}
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
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                    rows="4"
                    required
                  />
                )}
              </div>
            ))}

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                className="px-6 py-3 bg-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-400 transition"
              >
                Clear All
              </button>
            </div>
          </form>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 text-center text-gray-600">
          <p>
            Question{" "}
            {Object.values(answers).filter((a) => a.trim() !== "").length} of{" "}
            {survey?.questions.length} answered
          </p>
          <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{
                width: `${survey ? (Object.values(answers).filter((a) => a.trim() !== "").length / survey.questions.length) * 100 : 0}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyResponse;
