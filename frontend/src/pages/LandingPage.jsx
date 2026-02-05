import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-8 py-4 border-b">
        <img src="/logo.jpg" alt="Survii" className="h-12 bg-white" />
        <div className="flex gap-4">
          <button className="px-4 py-2 text-gray-600 hover:text-purple-400 cursor-pointer">
            Log in
          </button>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:text-gray-800 cursor-pointer hover:bg-purple-400">
            Sign in
          </button>
        </div>
      </nav>

      <section className="px-8 py-24 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Create Surveys with AI
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Describe your goal and let AI generate the perfect survey questions.
          Get insights from responses in seconds.
        </p>
        <button className="px-8 py-4 bg-gray-900 text-white text-lg rounded-lg hover:bg-purple-400 hover:text-gray-800">
          Get Started Free →
        </button>
      </section>

      <section className="px-8 py-16 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4"><img src="/icon1.jpg" alt="" /></div>
            <p className="text-gray-600">
              Describe your goal, get perfect questions instantly
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4"><img src="/icon2.jpg" alt="" /></div>
            
            <p className="text-gray-600">
              AI analyzes responses and finds key insights
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4"><img src="/icon3.jpg" alt="" /></div>
            <p className="text-gray-600">
              Share with one link, no login required for respondents
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 text-center text-gray-500 border-t">
        © 2026 Survii. Built by Niloo & Karishma.
      </footer>
    </div>
  );
};

export default LandingPage;
