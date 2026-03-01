import React from "react";
import HeroBackground from "../components/HeroBackground.jsx";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <HeroBackground />
      <div className="relative z-10">
        {/* Navigation */}
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
              to="/login"
              className="px-4 py-2 text-gray-200 hover:text-purple-400"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-purple-900 text-white rounded-lg hover:text-gray-800 cursor-pointer hover:bg-purple-400"
            >
              Sign in
            </Link>
          </div>
        </nav>

        {/* About Hero Section */}
        <section className="relative px-8 py-24 text-center">
          <h1 className="text-8xl font-bold text-gray-100 mt-12 mb-6">
            About Survii
          </h1>
          <p className="text-2xl text-gray-200 max-w-3xl mx-auto">
            Revolutionizing survey creation with AI-powered intelligence
          </p>
        </section>

        {/* Mission Section */}
        <section className="px-8 py-16 bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-100 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              At Survii, we believe that gathering feedback and insights shouldn't be complicated or time-consuming. Our mission is to empower businesses, researchers, and organizations to create professional surveys in minutes, not hours.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              By leveraging cutting-edge AI technology, we help you craft the perfect survey questions tailored to your specific goals, analyze responses intelligently, and make data-driven decisions with confidence.
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="px-8 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-100 mb-12 text-center">
              What We Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-purple-500">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">
                  AI-Powered Survey Generation
                </h3>
                <p className="text-gray-300">
                  Simply describe your objective, and our intelligent AI generates carefully crafted survey questions optimized for your target audience.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-purple-500">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">
                  Intelligent Analysis
                </h3>
                <p className="text-gray-300">
                  Our AI analyzes survey responses to extract meaningful insights, identify patterns, and provide actionable recommendations.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-purple-500">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">
                  Easy Distribution
                </h3>
                <p className="text-gray-300">
                  Share your surveys with a single link. Respondents can participate without registration, making data collection seamless.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-8 py-16 bg-gray-900">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-100 mb-12 text-center">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-100 mb-2">Niloo</h3>
                <p className="text-purple-400 mb-2">Co-Founder</p>
                <p className="text-gray-300">
                  Passionate about creating innovative solutions that simplify complex problems through technology.
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-100 mb-2">Karishma</h3>
                <p className="text-purple-400 mb-2">Co-Founder</p>
                <p className="text-gray-300">
                  Driven to build user-friendly applications that make a meaningful impact on businesses and organizations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="px-8 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-100 mb-12 text-center">
              Why Choose Survii?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="text-purple-400 text-3xl">✓</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    Time-Saving
                  </h3>
                  <p className="text-gray-300">
                    Create professional surveys in minutes, not hours. Let AI do the heavy lifting.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-purple-400 text-3xl">✓</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    AI-Optimized
                  </h3>
                  <p className="text-gray-300">
                    Our AI ensures questions are clear, unbiased, and optimized for high response rates.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-purple-400 text-3xl">✓</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    Easy Sharing
                  </h3>
                  <p className="text-gray-300">
                    Share surveys effortlessly with a single link. No complex setup required.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-purple-400 text-3xl">✓</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    Deep Insights
                  </h3>
                  <p className="text-gray-300">
                    Get actionable insights from your data with intelligent AI-powered analysis.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-purple-400 text-3xl">✓</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    User-Friendly
                  </h3>
                  <p className="text-gray-300">
                    Intuitive interface accessible to everyone, regardless of technical expertise.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-purple-400 text-3xl">✓</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    Secure & Private
                  </h3>
                  <p className="text-gray-300">
                    Your data is encrypted and protected with enterprise-grade security standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 py-16 bg-gray-900 text-center">
          <h2 className="text-4xl font-bold text-gray-100 mb-6">
            Ready to Transform Your Surveys?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users creating smarter surveys with AI
          </p>
          <Link
            to="/register"
            className="px-8 py-4 bg-purple-900 text-white text-lg rounded-lg hover:bg-purple-400 hover:text-gray-800 inline-block"
          >
            Get Started Free →
          </Link>
        </section>

        {/* Footer */}
        <footer className="px-8 py-6 text-center text-gray-400 border-t">
          © 2026 Survii. Built by Niloo & Karishma.
        </footer>
      </div>
    </div>
  );
};

export default About;
