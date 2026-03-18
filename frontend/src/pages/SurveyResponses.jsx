import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SurveyResponses = () => {
  const { surveyId } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const resp = await fetch(
          `http://localhost:8000/surveys/${surveyId}/responses`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!resp.ok) throw new Error("Failed to fetch responses");
        const data = await resp.json();
        setResponses(data.responses || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [surveyId]);

  if (loading) return <div>Loading responses...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Survey Responses</h2>
      {responses.length === 0 ? (
        <div>No responses yet.</div>
      ) : (
        <div className="space-y-6">
          {responses.map((resp) => (
            <div key={resp.id} className="bg-white p-4 rounded-lg border">
              <div className="mb-2 font-semibold">Response #{resp.id}</div>
              <ul className="mb-2">
                {resp.answers.map((a) => (
                  <li key={a.id}>
                    <span className="font-medium">{a.question_text}:</span> {a.answer_text}
                  </li>
                ))}
              </ul>
              <Link
                to={`/survey/${surveyId}?responseId=${resp.id}`}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
              >
                Edit Response
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyResponses;
