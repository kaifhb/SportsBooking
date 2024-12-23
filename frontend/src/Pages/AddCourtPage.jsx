import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { backURL } from "../../constants";

const AddCourtPage = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sportId,centreId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${backURL}/api/court/addCourt`, { name, sport: sportId }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      navigate(`/allSports?centreId=${centreId}`); // Redirect to sport-specific page
    } catch (err) {
      setLoading(false);
      setError("Failed to add court. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-indigo-800 text-center mb-6">
          Add a New Court
        </h1>
        {error && (
          <div className="mb-4 text-red-600 text-center font-medium">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Court Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter court name"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center ${loading ? "cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Court"}
          </button>
        </form>

        <button
          className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
          onClick={() => navigate(`/sports/${sportId}`)}
        >
          Back to Sport
        </button>
      </div>
    </div>
  );
};

export default AddCourtPage;