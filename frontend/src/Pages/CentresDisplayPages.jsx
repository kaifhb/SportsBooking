import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const CentresDisplayPages = () => {
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        console.log("url: ", import.meta.env.VITE_API_URL);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/centre/getCentres`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCentres(response?.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching centres:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchCentres();
  }, []);

  async function handleClick(centerId) {
    try {
      console.log("centreId: ", centerId);
      navigate(`/allSports?centreId=${centerId}`);
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout() {
    localStorage.setItem("token",null);
    navigate("/"); // Assuming you have a login page route
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-indigo-600">
          Loading centres...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-red-600">
          Error loading centres.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-indigo-800">
            Discover Our Sports Centres
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {centres.map((centre) => (
            <div
              key={centre?._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleClick(centre?._id)}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {centre.name}
                </h2>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon />
                  <p>{centre.location}</p>
                </div>
              </div>
              <div className="px-6 py-4 bg-indigo-50">
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200">
                  View Sports
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CentresDisplayPages;
