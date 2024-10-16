import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios'; // Import Axios

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      const data = res?.data;
      
      if (res?.status === 200 && data?.success) {
        if (data?.token && data?.user) {
          setFormData({ email: '', password: '' });
          localStorage.setItem("token", data?.token);
          navigate('/centrePage');
        } else {
          setMessage('Invalid response from server.');
          console.error("Login response missing token or user:", data);
        }
      } else {
        setMessage(data?.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

        {message && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>


        <Link
          to="/registrationPage"
        className="ml-2 mt-2 text-blue-500 hover:text-blue-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
