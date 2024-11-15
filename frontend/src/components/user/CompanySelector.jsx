import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyContext } from "../../context/CompanyProvider";

export const CompanySelector = () => {
  const { companies } = useContext(CompanyContext);
  const [selectedCompany, setSelectedCompany] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCompany) {
      const [companyId, companyName] = selectedCompany.split(",");
      navigate(`/company/${companyId}/${companyName}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-16 flex items-center border border-PrimaryBlue rounded-full overflow-hidden w-4/5 max-w-md md:max-w-lg lg:max-w-xl"
    >
      <select
        value={selectedCompany}
        onChange={handleChange}
        className="w-full px-4 py-2 text-gray-700 focus:outline-none bg-GreyishPurple"
        required
      >
        <option value="" disabled>
          Select a company
        </option>
        {companies.map((company) => (
          <option
            key={company.id}
            value={`${company.id},${encodeURIComponent(company.name)}`}
          >
            {company.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="px-4 py-2 h-full bg-blue-600 text-white hover:bg-blue-500 rounded-full focus:outline-none"
      >
        Go
      </button>
    </form>
  );
};
