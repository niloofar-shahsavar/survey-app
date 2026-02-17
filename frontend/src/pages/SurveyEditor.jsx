import React from "react";

const SurveyEditor = () => {
  const questions = [
    { id: 1, text: "How satisfied are you with our service?", type: "Rating" },
    { id: 2, text: "What could we improve?", type: "Text" },
    { id: 3, text: "Would you recommend us to others?", type: "Rating" },
    { id: 4, text: "How did you hear about us?", type: "Multiple Choice" },
  ];

return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b">
        <div className="text-2xl font-bold text-purple-900">Survii</div>
        <button className="text-gray-500 hover:text-purple-600">← Back to Dashboard</button>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customer Feedback</h1>
            <p className="text-gray-500 text-sm">4 questions</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Publish
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white p-4 rounded-lg border flex justify-between items-center"
            >
              <div className="flex gap-3 items-start">
                <span className="text-gray-400 mt-1">⋮⋮</span>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Question {index + 1} • {question.type}</p>
                  <p className="text-gray-800">{question.text}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-purple-600">✏️</button>
                <button className="text-gray-400 hover:text-red-500">🗑️</button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Question */}
        <button className="w-full mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-purple-400 hover:text-purple-600">
          + Add Question
        </button>
      </main>
    </div>
  )
}

export default SurveyEditor;
