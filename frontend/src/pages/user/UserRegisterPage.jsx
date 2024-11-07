import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export const UserRegisterPage = () => {
  const { register, error, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData, false);
      alert("Successfully registered user");
      navigate("/");
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <section className="container mx-auto max:h-screen">
      <h1 className="text-3xl text-PrimaryBlue font-bold text-center mt-8">
        Register
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col space-y-8 my-8 px-6 py-10 w-4/5 md:w-2/5 min-h-3/5 rounded-xl shadow-2xl shadow-slate-400"
      >
        {error && (
          <p className="error bg-red-200 text-red-500 text-center p-2">
            {error}
          </p>
        )}
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-gray-300 w-full h-12 p-5 border-blue-300 border rounded-2xl"
        />
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
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <a href="/login" className="text-PrimaryBlue hover:font-bold">
            {" Login"}
          </a>
        </p>
      </form>
    </section>
  );
};
