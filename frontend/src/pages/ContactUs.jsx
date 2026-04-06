import { useState } from "react";
import { Link } from "react-router-dom";
import HeroBackground from "../components/HeroBackground.jsx";
import Footer from "../components/Footer.jsx";
import API_BASE from "../config/api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE}/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || "Failed to send message");
        return;
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
        <section className="relative px-6 md:px-12 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-purple-900/30 border border-purple-700/50 text-purple-300 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              We're here to help
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Touch
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have questions about Survii? Want to learn how AI-powered surveys
              can transform your research? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="px-6 md:px-12 pb-16">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Email Us",
                value: "hello@survii.com",
                href: "mailto:hello@survii.com",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Response Time",
                value: "Within 24 hours",
                href: null,
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Location",
                value: "Stockholm, Sweden",
                href: "#location",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 hover:bg-gray-800/80 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-400 group-hover:bg-purple-900/70 group-hover:text-purple-300 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-400">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="px-6 md:px-12 py-16 md:py-24 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Side - Info */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Send Us a Message
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Fill out the form and our team will get back to you within 24 hours.
                  Whether you have questions about features, pricing, or need a demo,
                  we're ready to help.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-700/50 flex items-center justify-center text-purple-400 shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Quick Response</h4>
                      <p className="text-gray-400">We respond to all inquiries within one business day.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-700/50 flex items-center justify-center text-purple-400 shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Expert Support</h4>
                      <p className="text-gray-400">Get help from our knowledgeable support team.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-700/50 flex items-center justify-center text-purple-400 shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Free Consultation</h4>
                      <p className="text-gray-400">Schedule a free demo to see Survii in action.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl blur-2xl"></div>
                <div className="relative p-8 bg-gray-800/50 rounded-3xl border border-gray-700/50 backdrop-blur-sm">
                  {success && (
                    <div className="mb-6 p-4 rounded-xl bg-green-900/30 border border-green-700/50 text-green-300">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Message sent successfully! We'll get back to you soon.
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-900/30 border border-red-700/50 text-red-300">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Your name"
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-gray-300 font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="5"
                        placeholder="Tell us about your project or question..."
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-900/30"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stockholm Location Section */}
        <section id="location" className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-purple-900/30 border border-purple-700/50 text-purple-300 text-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Our Headquarters
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Visit Us in Stockholm
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Our headquarters are located in the heart of Stockholm, Sweden—a
                global hub for innovation and technology.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              {/* Address Card */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-400 shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Office Address</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Survii AB<br />
                        Kungsgatan 8<br />
                        111 43 Stockholm<br />
                        Sweden
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-400 shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                      <a href="mailto:hello@survii.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                        hello@survii.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-400 shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Business Hours</h3>
                      <p className="text-gray-400">
                        Monday - Friday<br />
                        9:00 AM - 6:00 PM CET
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-700/30">
                  <h3 className="text-lg font-semibold text-white mb-2">Why Stockholm?</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Stockholm is home to some of the world's most innovative tech companies.
                    The city's vibrant startup ecosystem and commitment to sustainability
                    inspire our work every day.
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="lg:col-span-3 relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl"></div>
                <div className="relative rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.6287455853936!2d18.0619!3d59.3326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5a7d3e4a8b%3A0x0!2zNTnCsDE5JzU3LjQiTiAxOMKwMDMnNDIuOCJF!5e0!3m2!1sen!2sse!4v1699000000000!5m2!1sen!2sse"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Survii Office Location - Stockholm, Sweden"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 md:px-12 py-16 md:py-24 bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 text-lg">
                Quick answers to common questions about Survii.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "How quickly can I create a survey?",
                  answer: "With Survii's AI-powered generation, you can create a professional survey in just a few minutes. Simply describe your goals, and our AI will generate optimized questions for you.",
                },
                {
                  question: "Is there a free trial available?",
                  answer: "Yes! You can start using Survii for free with no credit card required. Our free tier includes all core features to help you get started with AI-powered surveys.",
                },
                {
                  question: "How do you handle data privacy?",
                  answer: "We take data privacy seriously. Survii is fully GDPR compliant, and all data is encrypted both in transit and at rest using industry-standard security protocols.",
                },
                {
                  question: "Can I schedule a demo?",
                  answer: "Absolutely! Fill out the contact form above or email us at hello@survii.com to schedule a personalized demo of Survii's features.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:border-gray-600 transition-all"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative p-12 md:p-16 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl border border-gray-700/50 backdrop-blur-sm">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of organizations using Survii to gather better insights faster.
                  Start your free trial today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/register"
                    className="px-10 py-4 bg-purple-600 text-white text-lg font-medium rounded-xl hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/40 hover:shadow-purple-900/60 hover:-translate-y-0.5"
                  >
                    Start Free Trial
                  </Link>
                  <Link
                    to="/about"
                    className="px-10 py-4 bg-transparent text-white text-lg font-medium rounded-xl border border-gray-600 hover:bg-gray-800 hover:border-gray-500 transition-all"
                  >
                    Learn More
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

export default ContactUs;
