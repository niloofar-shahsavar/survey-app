import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8000/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || "Failed to send message");
        return;
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="flex justify-between items-center px-8 py-4 border-b">
        <Link to="/" className="font-bold text-lg hover:underline">
          ← Back
        </Link>
        <div className="flex gap-4">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/login" className="hover:underline">
            Log in
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg">
            We'd love to hear from you. Get in touch with our team today.
          </p>
        </div>

        <div className="p-8 rounded-lg border">
          {success && (
            <div className="mb-4 p-4 rounded-lg text-sm border">
              Your message has been sent successfully! We'll get back to you soon.
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 rounded-lg text-sm border">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Subject</label>
              <input
                type="text"
                placeholder="Message subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-2">Message</label>
              <textarea
                placeholder="Your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="6"
                className="w-full p-3 border rounded-lg focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg hover:underline font-medium"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Other Ways to Reach Us</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p>
                  <a href="mailto:support@survii.com" className="hover:underline">
                    support@survii.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Office</h3>
                <p>
                  123 Survey Street<br />
                  Tech City, TC 12345<br />
                  United States
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p>
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-8 py-6 text-center border-t mt-12">
        © 2026 Survii. Built by Niloo & Karishma.
      </footer>
    </div>
  );
};

export default ContactUs;
