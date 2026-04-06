import { Link } from "react-router-dom";
import HeroBackground from "../components/HeroBackground.jsx";
import Footer from "../components/Footer.jsx";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-gray-950">
      <HeroBackground />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 border-b border-gray-800/50 backdrop-blur-sm bg-gray-950/30">
          <Link to="/">
            <img
              src="/unnamed-2-removebg-preview.png"
              alt="Survii"
              className="h-16 md:h-20 rounded-4xl"
            />
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/about"
              className="px-3 md:px-4 py-2 text-sm md:text-base text-gray-300 hover:text-purple-400 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-3 md:px-4 py-2 text-sm md:text-base text-gray-300 hover:text-purple-400 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="px-3 md:px-4 py-2 text-sm md:text-base text-gray-300 hover:text-purple-400 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="px-4 md:px-5 py-2 text-sm md:text-base bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/30"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative px-6 md:px-12 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-purple-900/30 border border-purple-700/50 text-purple-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              AI-Powered Survey Platform
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Create Surveys{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                in Seconds
              </span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl text-gray-300">
                Not Hours
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Describe your goal and let AI generate professional survey questions.
              Collect responses, analyze insights, and make data-driven decisions—all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="px-8 py-4 bg-purple-600 text-white text-lg font-medium rounded-xl hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/40 hover:shadow-purple-900/60 hover:-translate-y-0.5"
              >
                Start Free Trial
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-gray-800/50 text-white text-lg font-medium rounded-xl border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-all"
              >
                Learn More
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              No credit card required • Free forever for basic use
            </p>
          </div>
        </section>

        {/* Social Proof */}
        <section className="px-6 md:px-12 py-12 border-y border-gray-800/50 bg-gray-900/30 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-wider">
              Trusted by teams worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10K+", label: "Surveys Created" },
                { value: "500K+", label: "Responses" },
                { value: "98%", label: "Satisfaction" },
                { value: "50+", label: "Countries" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-purple-900/30 border border-purple-700/50 text-purple-300 text-sm">
                Simple 3-Step Process
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                How Survii Works
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                From idea to insights in minutes, not days. Our AI handles the complexity
                so you can focus on what matters.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  ),
                  title: "Describe Your Goal",
                  description: "Tell Survii what feedback you want to collect. Specify your industry, target audience, and objectives.",
                },
                {
                  step: "02",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  title: "AI Generates Questions",
                  description: "Our AI instantly creates optimized survey questions tailored to your specific goals and audience.",
                },
                {
                  step: "03",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: "Share & Analyze",
                  description: "Share your survey with a single link and watch responses come in. Get instant insights and analytics.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative p-8 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-400 group-hover:bg-purple-900/70 group-hover:text-purple-300 transition-all">
                        {item.icon}
                      </div>
                      <span className="text-5xl font-bold text-gray-800 group-hover:text-gray-700 transition-colors">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 md:px-12 py-20 md:py-28 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-purple-900/30 border border-purple-700/50 text-purple-300 text-sm">
                  Powerful Features
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Everything You Need to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Gather Insights
                  </span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Survii combines the power of artificial intelligence with intuitive design
                  to make professional survey creation accessible to everyone.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: "⚡",
                      title: "Lightning Fast",
                      description: "Create surveys in minutes, not hours. AI does the heavy lifting.",
                    },
                    {
                      icon: "🎯",
                      title: "Smart Questions",
                      description: "AI-optimized questions for higher response rates and better data.",
                    },
                    {
                      icon: "📊",
                      title: "Real-time Analytics",
                      description: "Watch responses come in and analyze results instantly.",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="text-3xl">{feature.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-3xl border border-gray-700/50 backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                      <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center text-purple-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">AI-Powered Generation</div>
                        <div className="text-gray-500 text-sm">Describe your goal, get perfect questions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                      <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center text-purple-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">One-Click Sharing</div>
                        <div className="text-gray-500 text-sm">Share with a simple link, no signup needed</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                      <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center text-purple-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">Instant Analytics</div>
                        <div className="text-gray-500 text-sm">Real-time insights and visualizations</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                      <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center text-purple-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">GDPR Compliant</div>
                        <div className="text-gray-500 text-sm">Enterprise-grade security and privacy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Perfect For Every Use Case
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Whether you're collecting customer feedback, conducting research, or gathering
                employee insights, Survii adapts to your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "💼",
                  title: "Customer Feedback",
                  description: "Understand your customers better with targeted surveys.",
                },
                {
                  icon: "📈",
                  title: "Market Research",
                  description: "Gather insights to make informed business decisions.",
                },
                {
                  icon: "👥",
                  title: "Employee Surveys",
                  description: "Measure engagement and improve workplace culture.",
                },
                {
                  icon: "🎓",
                  title: "Academic Research",
                  description: "Collect data for studies and academic projects.",
                },
              ].map((useCase, index) => (
                <div
                  key={index}
                  className="group p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 hover:bg-gray-800/80 transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="px-6 md:px-12 py-20 md:py-28 bg-gray-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
              <div className="relative p-10 md:p-14 bg-gray-800/30 rounded-3xl border border-gray-700/50">
                <svg className="w-12 h-12 mx-auto mb-6 text-purple-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-xl md:text-2xl text-white mb-6 leading-relaxed">
                  "Survii transformed how we gather customer feedback. What used to take hours now takes minutes,
                  and the AI-generated questions are surprisingly thoughtful and relevant."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">xxxxxx</div>
                    <div className="text-gray-400 text-sm">xxxxxxxxxx</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative p-12 md:p-16 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl border border-gray-700/50 backdrop-blur-sm">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Ready to Create Your First Survey?
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                  Join thousands of teams using Survii to gather better insights faster.
                  Start your free trial today—no credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/register"
                    className="px-10 py-4 bg-purple-600 text-white text-lg font-medium rounded-xl hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/40 hover:shadow-purple-900/60 hover:-translate-y-0.5"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/contact"
                    className="px-10 py-4 bg-transparent text-white text-lg font-medium rounded-xl border border-gray-600 hover:bg-gray-800 hover:border-gray-500 transition-all"
                  >
                    Talk to Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
