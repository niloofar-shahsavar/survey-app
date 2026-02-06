function Dashboard() {
  const surveys = [
    { id: 1, title: "Customer Feedback", responses: 45, status: "Active" },
    { id: 2, title: "Employee Survey", responses: 32, status: "Active" },
    { id: 3, title: "Product Research", responses: 50, status: "Closed" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b">
        <div className="text-2xl font-bold text-purple-900">Survii</div>
        <div className="flex gap-4 items-center">
          <span className="text-gray-600">niloo@email.com</span>
          <button className="text-gray-500 hover:text-purple-600">
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Surveys</h1>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            + Create New
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border text-center">
            <div className="text-3xl font-bold text-gray-800">3</div>
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

        <div className="space-y-3">
          {surveys.map((survey) => (
            <div
              key={survey.id}
              className="bg-white p-5 rounded-lg border flex justify-between items-center hover:border-purple-300 hover:shadow-sm cursor-pointer transition"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{survey.title}</h3>
                <p className="text-gray-500 text-sm">
                  {survey.responses} responses • {survey.status}
                </p>
              </div>
              <div className="text-purple-400">→</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
