import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";
import API_BASE from "../config/api";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [surveyToDelete, setSurveyToDelete] = useState(null);
  const [totalResponses, setTotalResponses] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_BASE}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          localStorage.removeItem("access_token");
          navigate("/login");
          return;
        }

        const userData = await response.json();
        setUser(userData);

        const surveysResponse = await fetch(`${API_BASE}/surveys`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (surveysResponse.ok) {
          const surveysData = await surveysResponse.json();
          setSurveys(surveysData);
          const total = surveysData.reduce((sum, s) => sum + (s.response_count || 0), 0);
          setTotalResponses(total);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      navigate("/");
    }
  };

  const handleDeleteSurvey = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE}/surveys/${surveyToDelete.id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.ok) {
        setSurveys(surveys.filter((s) => s.id !== surveyToDelete.id));
      }
    } catch (err) {
      console.error("Error deleting survey:", err);
    } finally {
      setShowDeleteModal(false);
      setSurveyToDelete(null);
    }
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
        <div className="text-xl font-bold text-gray-900 dark:text-white">Survii</div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 dark:text-gray-500 text-sm hidden sm:block">{user?.email}</span>
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Surveys</h1>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-0.5">Manage and share your surveys</p>
          </div>
          <Link
            to="/create"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm"
          >
            + Create New
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { value: surveys.length, label: "Total Surveys" },
            { value: totalResponses, label: "Total Responses" },
            { value: surveys.filter((s) => s.questions_count > 0).length, label: "Active" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-center shadow-sm dark:shadow-none hover:border-purple-300 dark:hover:border-purple-500/20 transition-all duration-200"
            >
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
              <div className="text-gray-500 dark:text-gray-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>

        {surveys.length === 0 ? (
          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center shadow-sm dark:shadow-none">
            <p className="text-gray-500 dark:text-gray-400 mb-1">No surveys yet</p>
            <p className="text-gray-400 dark:text-gray-600 text-sm">Create your first survey to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {surveys.map((survey) => (
              <Link
                to={`/editor/${survey.id}`}
                key={survey.id}
                className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-5 flex justify-between items-center hover:border-purple-300 dark:hover:border-purple-500/30 hover:shadow-md dark:hover:shadow-none transition-all duration-200 group"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {survey.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500 text-sm truncate mt-0.5">
                    {survey.description || "No description"}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSurveyToDelete(survey);
                      setShowDeleteModal(true);
                    }}
                    className="px-3 py-1.5 text-sm text-red-500 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                  >
                    Delete
                  </button>
                  <div className="text-purple-400 group-hover:translate-x-0.5 transition-transform duration-200">→</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-7 rounded-xl max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Survey</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              Are you sure you want to delete "{surveyToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSurvey}
                className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg transition-all duration-200 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
