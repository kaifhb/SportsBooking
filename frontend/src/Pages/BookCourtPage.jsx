import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { backURL } from "../../constants";

const BookCourtPage = () => {
  const [searchParams] = useSearchParams();
  const sportId = searchParams.get("sportId");
  const centreId = searchParams.get("centreId");
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState("");
  const [courtPrice, setCourtPrice] = useState(0);

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  useEffect(() => {
    fetchCourts();
    fetchDynamicPrice();
  }, []);

  useEffect(() => {
    if (selectedDate && selectedCourt) {
      fetchTimeSlots();
    }
  }, [selectedDate, selectedCourt]);

  const fetchTimeSlots = async () => {
    if (!sportId || !centreId || selectedDate === "" || selectedCourt === "") {
      return;
    }
    try {
      const response = await axios.post(
        `${backURL}/api/schedule/availableSlots`,
        {
          sportId,
          centreId,
          selectedDate,
          selectedCourt,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response?.data;
      console.log("timeslots: ", data);
      setTimeSlots(data?.availableSlots);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  const fetchCourts = async () => {
    try {
      const response = await axios.post(
        `${backURL}/api/court/getCourt`,
        {
          sportId,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response?.data;
      setCourts(data);
    } catch (error) {
      console.error("Error fetching courts:", error);
    }
  };

  const fetchDynamicPrice = async () => {
    try {
      const response = await axios.get(
        `${backURL}/api/sport/getDynamicPrice?sportId=${sportId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response?.data;
      setCourtPrice(data);
    } catch (error) {
      console.error("Error fetching courts:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/centrePage");
  };

  const handleSubmit = async () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    if (selectedDate < today) {
      alert("You cannot book a court for a past date.");
      return;
    }

    console.log("data: ", {
      court: selectedCourt,
      date: selectedDate,
      centre: centreId,
      sport: sportId,
      startTime: selectedTimeSlot,
    });
    try {
      const res = await axios.post(
        `${backURL}/api/booking/createBooking`,
        {
          court: selectedCourt,
          date: selectedDate,
          centre: centreId,
          sport: sportId,
          startTime: selectedTimeSlot,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("front", res?.data);

      // Show the confirmation message after successful booking
      setIsBookingConfirmed(true);

      // Automatically hide the confirmation message after 3 seconds
      setTimeout(() => setIsBookingConfirmed(false), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-12">
          Court Booking
        </h1>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Price</h2>
              <h3 className="text-gray-500">{courtPrice}</h3>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Select Date
              </h2>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]} // Disable past dates
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Select Court
              </h2>
              <select
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              >
                <option value="">Select a court</option>
                {courts &&
                  courts?.map((court) => (
                    <option key={court._id} value={court._id}>
                      {court.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Select Time Slot
              </h2>
              <select
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              >
                <option value="">Select a time slot</option>
                {timeSlots?.map((slot, ind) => (
                  <option key={ind} value={slot._id}>
                    {slot.startTime}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 text-lg font-semibold"
            >
              Book Court
            </button>
            <button
              onClick={handleBackClick}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 mt-10 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 text-lg font-semibold"
            >
              Back to Centres
            </button>
          </div>
        </div>
        {isBookingConfirmed && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg animate-bounce">
            Booking Confirmed!
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCourtPage;
