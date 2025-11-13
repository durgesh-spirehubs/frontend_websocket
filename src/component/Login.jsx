import { useState } from "react";
import { login } from "../api/api";
import Chat from "./Chat";
import Dashboard from "../pages/Dashboard";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorEmail(true);
    }
    if (!password) {
      setErrorPassword(true);
    }
    const credential = { email, password };
    try {
      const response = await login(credential);
      const token = response?.data?.token;
      const userId = response?.data?.user?.id;
      if (token && userId) {
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", userId);
        setFlag(true);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  if (flag) {
    navigate("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className=" text-gray-700 text-sm mb-1 flex justify-start font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errorEmail
                  ? "border-red-500 focus:ring-red-400"
                  : "border-grey-400 focus:ring-blue-400"
              }`}
            />
            {errorEmail && (
              <p className="text-red-500 flex justify-start mt-1">
                Email is required
              </p>
            )}
          </div>
          <div>
            <label className=" text-gray-700 text-sm mb-1 flex justify-start font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errorPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-grey-400 focus:ring-blue-400"
              }`}
            />
            {errorPassword && (
              <p className="text-red-500 flex justify-start mt-1">
                Password is required
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
