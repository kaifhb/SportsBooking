import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backURL } from "../../constants";
import getLoggedInUserDetails from "../Utils/getLoggedInUserDetails";

const AddCentrePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    priceFactor: 1.0,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(()=>{
    async function getDetails(){
      try {
        const data = await getLoggedInUserDetails();
        console.log(data);
        
        if(data?.success === false ){
          navigate('/centrePage')
        }
        else{
          if(data?.role === 'customer'){
            navigate('/centrePage')

          }
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    // console.log("sdhjfjd");
    
    getDetails();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        console.log(formData);
        
      await axios.post(`${backURL}/api/centre/addCentre`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      navigate("/centrePage");
    } catch (err) {
      setLoading(false);
      setError("Failed to add centre. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-indigo-800 text-center mb-6">
          Add a New Centre
        </h1>
        {error && (
          <div className="mb-4 text-red-600 text-center font-medium">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Centre Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter centre name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter location"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="priceFactor">
              Price Factor
            </label>
            <input
              type="number"
              id="priceFactor"
              name="priceFactor"
              value={formData.priceFactor}
              onChange={handleChange}
              step="0.1"
              min="0.1"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter price factor (e.g., 1.0)"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center ${loading ? "cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : null}
            {loading ? "Adding..." : "Add Centre"}
          </button>
        </form>

        <button
          onClick={() => navigate("/centrePage")}
          className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
        >
          Back to Centres
        </button>
      </div>
    </div>
  );
};

export default AddCentrePage;