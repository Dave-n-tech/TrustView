import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthProvider"

export const BusinessRegisterPage = () => {
  const {register, error, loading} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    website: "",
    phoneNumber: "",
    address: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData, true)
      alert("Account successfuly created");
      navigate("/business")
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <section className="container mx-auto h-screen">
      <h1 className="text-3xl text-PrimaryBlue font-bold text-center mt-8">
        Business Registration
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col space-y-6 my-8 px-6 py-10 w-4/5 md:w-2/5 min-h-3/5 rounded-xl shadow-2xl shadow-slate-400"
      >
        {error && (
          <p className="error bg-red-200 text-red-500 text-center p-2">
            {error}
          </p>
        )}
        <input
          type="text"
          name="name"
          placeholder="Business Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-gray-300 w-full h-12 p-5 border-blue-300 border rounded-2xl"
        />
        <input
          type="email"
          name="email"
          placeholder="Business Email"
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
        <input
          type="url"
          name="website"
          placeholder="Website URL"
          value={formData.website}
          onChange={handleChange}
          className="bg-gray-300 w-full h-12 p-5 border-blue-300 border rounded-2xl"
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="bg-gray-300 w-full h-12 p-5 border-blue-300 border rounded-2xl"
        />
        <input
          type="text"
          name="address"
          placeholder="Business Address"
          value={formData.address}
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
          <a href="/login/business" className="text-PrimaryBlue hover:font-bold">
            Login
          </a>
        </p>
      </form>
    </section>
  );
}
