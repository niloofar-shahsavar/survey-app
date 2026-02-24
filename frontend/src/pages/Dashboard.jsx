import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:8000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("access_token");
          navigate("/login");
          return;
        }

        const userData = await response.json();
        setUser(userData);

        const surveysResponse = await fetch("http://localhost:8000/surveys/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (surveysResponse.ok) {
          const surveysData = await surveysResponse.json();
          setSurveys(surveysData);
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
      await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      navigate("/");
    }
  };

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
        <div className="flex gap-4 items-center">
          <span className="text-gray-600">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-purple-600 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Surveys</h1>
          <Link
            to="/create"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            + Create New
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border text-center">
            <div className="text-3xl font-bold text-gray-800">
              {surveys.length}
            </div>
            <div className="text-gray-500 text-sm">Total Surveys</div>
          </div>
          <div className="bg-white p-6 rounded-lg border text-center">
            <div className="text-3xl font-bold text-gray-800">127</div>
            <div className="text-gray-500 text-sm">Total Responses</div>
          </div>
          <div className="bg-white p-6 rounded-lg border text-center">
            <div className="text-3xl font-bold text-gray-800">2</div>
            <div className="text-gray-500 text-sm">Active</div>
          </div>
        </div>
        {surveys.length === 0 ? (
          <div className="bg-white p-8 rounded-lg border text-center">
            <p className="text-gray-500">
              No surveys yet. Create your first one!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {surveys.map((survey) => (
              <div
                key={survey.id}
                className="bg-white p-5 rounded-lg border flex justify-between items-center hover:border-purple-300 hover:shadow-sm cursor-pointer transition"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {survey.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {survey.description || "No description"}
                  </p>
                </div>
                <div className="text-purple-400">→</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
