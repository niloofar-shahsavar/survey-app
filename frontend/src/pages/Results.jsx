import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import API_BASE from "../config/api";

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
          `${API_BASE}/surveys/${surveyId}/responses`,
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

  const exportToCSV = () => {
    if (!data || data.responses.length === 0) return;

    const answers = data.responses[0].answers;
    const title = data.survey_title || "survey";

    // Short headers
    const headers = answers.map((_, i) => `Q${i + 1}`);

    // Build CSV with responses
    let csv = headers.join(",") + "\n";

    data.responses.forEach((response) => {
      const row = response.answers.map((a) => `"${a.answer_text}"`).join(",");
      csv += row + "\n";
    });

    // Add empty rows + legend as separate section
    csv += "\n\n";
    csv += "QUESTION\n";
    csv += "Code,Full Question\n";
    answers.forEach((a, i) => {
      const text = a.question_text || `Question ${a.question_id}`;
      csv += `Q${i + 1},"${text.replace(/"/g, '""')}"\n`;
    });

    // Download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, "-")}-results.csv`;
    link.click();
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
              {data?.survey_title || "Survey Results"}
            </h1>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-0.5">
              {data?.total_responses || 0} responses collected
            </p>
          </div>
          <button
            onClick={exportToCSV}
            disabled={!data || data.total_responses === 0}
            className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 disabled:bg-gray-400 dark:disabled:bg-gray-700 transition-colors duration-200"
          >
            Export CSV
          </button>
        </div>
        {data?.total_responses === 0 ? (
          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center shadow-sm dark:shadow-none">
            <p className="text-gray-500 dark:text-gray-400 mb-1">
              No responses yet
            </p>
            <p className="text-gray-400 dark:text-gray-600 text-sm">
              Share your survey link to collect responses.
            </p>
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
                    <div
                      key={i}
                      className="border-l-2 border-purple-200 dark:border-purple-500/30 pl-4"
                    >
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                        Question {answer.question_id}
                      </p>
                      <p className="text-gray-800 dark:text-gray-200">
                        {answer.answer_text}
                      </p>
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
