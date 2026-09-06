import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth.jsx";
import { toast } from 'react-toastify';

const Login = () => {
  const { adminLogin } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLogin(credentials);
      localStorage.setItem("adminToken", response.token);
      toast.success(response.message || "Admin logged in successfully");
      
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please check your credentials and try again.");
    }

    setCredentials({ email: "" });
  }

  return (
    <section id="login" className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-white mb-4">Login</h1>
      <form className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="text-white">Email:</label>
          <input className="ml-2 bg-gray-700 text-white placeholder:text-gray-400 border border-gray-600 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" id="email" name="email" required onChange={handleChange} />
        </div>

        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${!credentials.email ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          Login
        </button>
      </form>
    </section>
  )
}

export default Login;