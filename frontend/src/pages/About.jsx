import { Link } from "react-router-dom";
import HeroBackground from "../components/HeroBackground.jsx";
import Footer from "../components/Footer.jsx";

const About = () => {
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
        <section className="relative px-6 md:px-12 pt-20 pb-24 md:pt-32 md:pb-36">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-purple-900/30 border border-purple-700/50 text-purple-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              Based in Stockholm, Sweden
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Building the Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Intelligent Surveys
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to transform how businesses gather insights.
              Our AI-powered platform makes creating professional surveys effortless,
              so you can focus on what matters most—understanding your audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-purple-600 text-white text-lg font-medium rounded-xl hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/40 hover:shadow-purple-900/60 hover:-translate-y-0.5"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-gray-800/50 text-white text-lg font-medium rounded-xl border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 md:px-12 py-12 border-y border-gray-800/50 bg-gray-900/30 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Surveys Created" },
              { value: "500K+", label: "Responses Collected" },
              { value: "98%", label: "Customer Satisfaction" },
              { value: "50+", label: "Countries Served" },
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
        </section>

        {/* Our Story Section */}
        <section className="px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <p>
                    Survii was born from a simple frustration: creating meaningful surveys
                    shouldn't require hours of work or a research degree. As entrepreneurs
                    ourselves, we experienced firsthand how time-consuming and complex
                    traditional survey tools can be.
                  </p>
                  <p>
                    Founded in Stockholm in 2024, we set out to build something different—a
                    platform that combines the power of artificial intelligence with intuitive
                    design. Our goal was to democratize professional survey creation, making
                    it accessible to businesses of all sizes.
                  </p>
                  <p>
                    Today, Survii helps thousands of organizations worldwide gather actionable
                    insights faster than ever before. From startups to enterprises, our customers
                    trust us to power their most important feedback initiatives.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 md:p-10 rounded-3xl border border-gray-700/50 backdrop-blur-sm">
                  <div className="text-6xl mb-6">💡</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Belief</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    We believe that every organization deserves access to powerful research
                    tools. Great insights shouldn't be reserved for those with big budgets
                    or specialized expertise—they should be available to everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="px-6 md:px-12 py-20 md:py-28 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What We Do
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Our AI-powered platform streamlines every step of the survey process,
                from creation to analysis.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  title: "AI-Powered Generation",
                  description: "Describe your goals, and our AI crafts expertly-worded survey questions optimized for your target audience.",
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: "Smart Analytics",
                  description: "Transform raw responses into actionable insights with intelligent analysis that identifies patterns and trends.",
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  ),
                  title: "Effortless Distribution",
                  description: "Share surveys with a single link. Respondents can participate instantly without registration or friction.",
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: "Enterprise Security",
                  description: "Your data is protected with bank-level encryption, GDPR compliance, and enterprise-grade security standards.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 hover:bg-gray-800/80 transition-all duration-300"
                >
                  <div className="w-14 h-14 mb-5 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-400 group-hover:bg-purple-900/70 group-hover:text-purple-300 transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose Survii
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                We're committed to values that put our customers first and drive
                continuous innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "⚡",
                  title: "Speed & Efficiency",
                  description: "Create professional surveys in minutes, not hours. Our AI handles the heavy lifting so you can focus on insights.",
                },
                {
                  icon: "🎯",
                  title: "Precision & Quality",
                  description: "AI-optimized questions ensure clarity, reduce bias, and maximize response rates for better data quality.",
                },
                {
                  icon: "🔒",
                  title: "Trust & Security",
                  description: "Your data is sacred. We employ industry-leading security practices and full GDPR compliance.",
                },
                {
                  icon: "💎",
                  title: "Simplicity",
                  description: "Powerful doesn't mean complicated. Our intuitive interface makes professional surveys accessible to everyone.",
                },
                {
                  icon: "🚀",
                  title: "Innovation",
                  description: "We continuously improve our AI to stay at the forefront of survey technology and deliver more value.",
                },
                {
                  icon: "🤝",
                  title: "Customer Focus",
                  description: "Your success is our success. Our dedicated support team is here to help you achieve your research goals.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-transparent border border-gray-800/50 hover:border-gray-700 transition-all"
                >
                  <div className="text-4xl shrink-0">{value.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-6 md:px-12 py-20 md:py-28 bg-gray-900/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Meet the Founders
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Two passionate entrepreneurs united by a vision to make survey
                creation smarter and more accessible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "Niloo",
                  bio: "Passionate about creating innovative solutions that simplify complex problems through technology. Niloo leads product vision and strategy, ensuring Survii delivers exceptional value to customers.",
                },
                {
                  name: "Karishma",
                  bio: "Driven to build user-friendly applications that make a meaningful impact. Karishma oversees engineering and AI development, bringing cutting-edge technology to life.",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="group relative p-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-3xl border border-gray-700/50 hover:border-purple-500/30 transition-all"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all"></div>
                  <div className="relative">
                    <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                      {member.name[0]}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-purple-400 font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-400 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
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
                  Ready to Transform Your Surveys?
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                  Join thousands of organizations using Survii to gather better insights
                  faster. Start your free trial today—no credit card required.
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
                    Contact Us
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

export default About;
