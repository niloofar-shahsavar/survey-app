import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";

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

  // Build per-question summary for charts
  const buildQuestionSummaries = () => {
    if (!data || !data.responses.length) return [];
    const questions = {};
    data.responses.forEach((response) => {
      response.answers.forEach((answer) => {
        const qId = answer.question_id;
        if (!questions[qId]) {
          questions[qId] = {
            id: qId,
            text: answer.question_text || `Question ${qId}`,
            type: answer.question_type || "text",
            answers: [],
          };
        }
        questions[qId].answers.push(answer.answer_text);
      });
    });
    return Object.values(questions);
  };

  const buildChartData = (answers) => {
    const counts = {};
    answers.forEach((a) => {
      const val = a || "(no answer)";
      counts[val] = (counts[val] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const COLORS = ["#9333ea", "#a855f7", "#c084fc", "#d8b4fe", "#7c3aed", "#6d28d9"];

  const questionSummaries = buildQuestionSummaries();

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
          <div className="space-y-6">
            {questionSummaries.map((q, idx) => {
              const isChoice = q.type === "multiple_choice" || q.type === "rating";
              const chartData = buildChartData(q.answers);
              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm dark:shadow-none"
                >
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium uppercase tracking-wide mb-1">
                    Question {idx + 1}
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium mb-4">
                    {q.text}
                  </p>

                  {isChoice ? (
                    <div>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={chartData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                          <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#f9fafb" }}
                            cursor={{ fill: "rgba(147,51,234,0.1)" }}
                          />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {chartData.map((_, i) => (
                              <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {chartData.map((item, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300">
                            {item.name}: {item.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {q.answers.map((ans, i) => (
                        <div key={i} className="border-l-2 border-purple-200 dark:border-purple-500/30 pl-3 py-0.5">
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{ans || <span className="text-gray-400 italic">No answer</span>}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Results;
