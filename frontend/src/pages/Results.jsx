import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const Results = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:8000/surveys/${surveyId}/responses`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!response.ok) {
          navigate("/dashboard");
          return;
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [surveyId, navigate]);

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

      <main className="max-w-3xl mx-auto px-8 py-8">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {data?.survey_title || "Survey Results"}
          </h1>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-0.5">
            {data?.total_responses || 0} responses collected
          </p>
        </div>

        {data?.total_responses === 0 ? (
          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center shadow-sm dark:shadow-none">
            <p className="text-gray-500 dark:text-gray-400 mb-1">No responses yet</p>
            <p className="text-gray-400 dark:text-gray-600 text-sm">Share your survey link to collect responses.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.responses.map((response, index) => (
              <div
                key={response.id}
                className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm dark:shadow-none hover:border-purple-300 dark:hover:border-purple-500/20 transition-all duration-200"
              >
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium uppercase tracking-wide mb-4">
                  Response {index + 1}
                </p>
                <div className="space-y-4">
                  {response.answers.map((answer, i) => (
                    <div key={i} className="border-l-2 border-purple-200 dark:border-purple-500/30 pl-4">
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                        Question {answer.question_id}
                      </p>
                      <p className="text-gray-800 dark:text-gray-200">{answer.answer_text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Results;
