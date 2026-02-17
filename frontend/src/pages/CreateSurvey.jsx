import { Link } from "react-router-dom";

function CreateSurvey() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b">
        <div className="text-2xl font-bold text-purple-900">Survii</div>
        <Link to="/dashboard" className="text-gray-500 hover:text-purple-600">
          ← Back to Dashboard
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Create New Survey
        </h1>
        <p className="text-gray-500 mb-8">
          Describe your goal and let AI generate questions for you.
        </p>

        <div className="bg-white p-6 rounded-lg border">
          <label className="block text-gray-700 font-medium mb-2">
            What do you want to learn?
          </label>
          <textarea
            placeholder="e.g., I want to understand customer satisfaction with our new product and identify areas for improvement..."
            className="w-full h-32 p-3 border rounded-lg text-gray-700 focus:outline-none focus:border-purple-400"
          />

          <button className="w-full mt-4 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            🤖 Generate Survey with AI
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-4">
          AI will create 5-10 questions based on your goal
        </p>
      </main>
    </div>
  );
}

export default CreateSurvey;
