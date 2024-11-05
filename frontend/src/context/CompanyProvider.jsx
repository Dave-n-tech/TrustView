import { Children, createContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getAllCompanies = async () => {
        setLoading(true)
        setError(null)
      try {
        const res = await axios.get(`/companies`);
        const companies = res.data;
        setCompanies(companies);
      } catch (error) {
        setError(error)
        console.error("An error occured: ", error);
      }finally{
        setLoading(false)
      }
    };

    getAllCompanies()
  },[]);

  return (
    <CompanyContext.Provider value={{companies, loading, error}}>{children}</CompanyContext.Provider>
  );
};
