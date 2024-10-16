import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const SportsDisplayPage = () => {
  const [searchParams] = useSearchParams();
  const centerId = searchParams.get("centreId");
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSports = async () => {
      try {
        setLoading(true);
        console.log(centerId);

        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/sport/getSportAtCentre?centreId=${centerId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSports(response?.data);
        console.log("res:", response?.data);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch sports. Please try again later.",err);
        setLoading(false);
      }
    };

    if (centerId) {
      fetchSports();
    } else {
      setError("No center ID provided.");
      setLoading(false);
    }
  }, [centerId]);

  const handleClick = (sportId) => {
    navigate(`/bookCourt?sportId=${sportId}&centreId=${centerId}`);
  };

  const handleBackClick = () => {
    navigate("/centrePage");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
        <div
          className="bg-white border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-800">
            Sports Available
          </h1>
          <button
            onClick={handleBackClick}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
          >
            Back to Centres
          </button>
        </div>
        {sports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sports.map((sport) => (
              <div
                key={sport._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleClick(sport._id)}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    {sport.name}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    Total Courts: {sport.courts.length}
                  </p>
                  <p className="text-gray-600">Center: {sport.centre.name}</p>
                </div>
                <div className="px-6 py-4 bg-indigo-50">
                  <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200">
                    Book Court
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600 bg-white shadow-md rounded-lg p-8">
            No sports available at this center.
          </p>
        )}
      </div>
    </div>
  );
};

export default SportsDisplayPage;
