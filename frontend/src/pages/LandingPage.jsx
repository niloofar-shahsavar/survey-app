import React from "react";
import HeroBackground from "../components/HeroBackground.jsx";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <HeroBackground />
      <div className="relative z-10">
        <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-500">
          <Link to='/'><img
            src="/unnamed-2-removebg-preview.png"
            alt="Survii"
            className="h-20 rounded-4xl"
          /></Link>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-200 hover:text-purple-400"
            >
              Log in
            </Link>
            <Link to="/register" className="px-4 py-2 bg-purple-900 text-white rounded-lg hover:text-gray-800 cursor-pointer hover:bg-purple-400">
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

          <Link to="/register" className="px-8 py-4 bg-purple-900 text-white text-lg rounded-lg hover:bg-purple-400  hover:text-gray-800">
            Get Started Free →
          </Link>
        </section>
        <section><div className="flex flex-cols-1 md:flex-row items-center justify-center mt-24"><div className="border border-gray-500 mx-12 my-12 h-86 w-86 rounded-lg"></div>
        <div className="border border-gray-500 mx-12 my-12 h-86 w-86 rounded-lg"></div></div></section>

        <section className="px-8 py-16 bg-purple">
          <div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-3 md:gap-8">
            <div className="text-center md:p-6">
              <div className="flex justify-center p-2 mb-4">
                <img className="rounded-xl" src="/icon1.jpg" alt="" />
              </div>
              <p className="text-gray-200">
                Describe your goal, get perfect questions instantly
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">
                <img className="rounded-xl" src="/icon2.jpg" alt="" />
              </div>

              <p className="text-gray-200">
                AI analyzes responses and finds key insights
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">
                <img className="rounded-xl" src="/icon3.jpg" alt="" />
              </div>
              <p className="text-gray-200">
                Share with one link, no login required for respondents
              </p>
            </div>
          </div>
        </section>

        <footer className="px-8 py-6 text-center text-gray-400 border-t">
          © 2026 Survii. Built by Niloo & Karishma.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
