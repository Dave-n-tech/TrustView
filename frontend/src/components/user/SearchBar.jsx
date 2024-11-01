import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/company/${company.id}/${company.name}`)

  }

  return (
    <div className="mx-auto mb-16 flex items-center border border-PrimaryBlue rounded-full overflow-hidden w-4/5 max-w-md md:max-w-lg lg:max-w-xl">
      <input
        type="text"
        name="company"
        value={searchTerm}
        placeholder="Search company"
        className="w-full px-4 py-2 text-gray-700 focus:outline-none bg-GreyishPurple placeholder-slate-800"
        onChange={handleChange}
      />
      <button className="px-4 py-2 h-full bg-blue-600 text-white hover:bg-blue-500 rounded-full focus:outline-none">
        <FaSearch />
      </button>
    </div>
  );
};
