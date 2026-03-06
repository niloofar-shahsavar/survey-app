import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

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
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {data?.survey_title || "Survey Results"}
          </h1>
          <p className="text-gray-500 text-sm">
            {data?.total_responses || 0} responses
          </p>
        </div>

        {data?.total_responses === 0 ? (
          <div className="bg-white p-8 rounded-lg border text-center">
            <p className="text-gray-500">No responses yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              Share your survey link to collect responses.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.responses.map((response, index) => (
              <div
                key={response.id}
                className="bg-white p-5 rounded-lg border"
              >
                <p className="text-sm text-purple-600 font-medium mb-3">
                  Response {index + 1}
                </p>
                <div className="space-y-3">
                  {response.answers.map((answer, i) => (
                    <div key={i} className="border-l-2 border-purple-200 pl-3">
                      <p className="text-sm text-gray-500">Question {answer.question_id}</p>
                      <p className="text-gray-800">{answer.answer_text}</p>
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