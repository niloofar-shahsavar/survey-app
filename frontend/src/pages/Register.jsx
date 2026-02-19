import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handelSubmit = () => {
    //API CALL KOMMER HÄR
    navigate("/dashboard");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center px-8 py-4">
        <Link to="/" className="text-gray-500 hover:text-purple-600 px-8 py-4">
          ← Back
        </Link>
      </nav>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-900">Survii</h1>
            <p className="text-gray-500 mt-2">Create your account</p>
          </div>

          <div className="bg-white p-8 rounded-lg border">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>

            <button
              onClick={handelSubmit}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Create Account
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
