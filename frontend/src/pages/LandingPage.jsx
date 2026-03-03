import React from "react";
import HeroBackground from "../components/HeroBackground.jsx";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <HeroBackground />

      <div className="relative z-10">

        <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-500">
          <Link to="/">
            <img
              src="/unnamed-2-removebg-preview.png"
              alt="Survii"
              className="h-20 rounded-4xl"
            />
          </Link>

          <div className="flex gap-4">
            <Link
              to="/about"
              className="px-4 py-2 text-gray-200 hover:text-purple-400"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="px-4 py-2 text-gray-200 hover:text-purple-400"
            >
              Contact
            </Link>

            <Link
              to="/login"
              className="px-4 py-2 text-gray-200 hover:text-purple-400"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-purple-900 text-white rounded-lg hover:text-gray-800 hover:bg-purple-400"
            >
              Sign in
            </Link>
          </div>
        </nav>


        <section className="relative px-8 text-center">
          <h1 className="text-6xl font-bold text-gray-100 mt-30">
            Welcome
          </h1>

          <h2 className="text-4xl font-bold text-gray-100 mb-6 mt-10">
            Create Surveys with AI
          </h2>

          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Describe your goal and let AI generate the perfect survey questions.
            Get insights from responses in seconds.
          </p>

          <Link
            to="/register"
            className="px-8 py-4 bg-purple-900 text-white text-lg rounded-lg hover:bg-purple-400 hover:text-gray-800"
          >
            Get Started Free →
          </Link>

          <section className="px-8 py-20">
  <h2 className="text-4xl font-bold text-center text-gray-200 mb-16">
    How Survii Works
  </h2>

  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

    <div className="bg-gray-900 p-8 rounded-xl text-center">
      <h3 className="text-2xl font-semibold text-purple-400 mb-4">
        1. Describe Your Goal
      </h3>
      <p className="text-gray-300">
        Tell Survii what feedback you want to collect and which industry the survey is for.
      </p>
    </div>

    <div className="bg-gray-900 p-8 rounded-xl text-center">
      <h3 className="text-2xl font-semibold text-purple-400 mb-4">
        2. AI Generates Questions
      </h3>
      <p className="text-gray-300">
        Our AI automatically creates smart survey questions based on your description.
      </p>
    </div>

    <div className="bg-gray-900 p-8 rounded-xl text-center">
      <h3 className="text-2xl font-semibold text-purple-400 mb-4">
        3. Share & Analyze
      </h3>
      <p className="text-gray-300">
        Share a survey link with customers and instantly analyze their responses.
      </p>
    </div>

  </div>
</section>
        </section>

        <footer className="px-8 py-6 text-center text-gray-400 border-t mt-20">
           <div className="flex justify-center gap-6 mb-3">
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
  </div>
          © 2026 Survii. Built by Niloo & Karishma.
        </footer>

      </div>
    </div>
  );
};

export default LandingPage;