import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({isBusiness}) => {
  const { login, error, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(formData)
    alert("Successfully registered user");
    isBusiness ? navigate("/business") : navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col space-y-8 my-4 px-6 py-10 w-4/5 md:w-2/5 min-h-3/5 rounded-xl shadow-2xl shadow-slate-400">
        {error && (
          <p className="error bg-red-200 text-red-500 text-center p-2">
            {error}
          </p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-gray-300 w-full h-12 p-5 border-blue-300 border rounded-2xl"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="bg-gray-300 w-full h-12 p-5 border-blue-300 border rounded-2xl"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-PrimaryBlue text-white h-12 rounded-2xl hover:bg-blue-900"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center">
          Don't have an account?
          <a href="/register/user" className="text-PrimaryBlue hover:font-bold">
            {" Register"}
          </a>
        </p>
      </form>
    </div>
  );
};
