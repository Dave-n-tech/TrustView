import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="relative container mx-auto p-2 bg-blue-50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-PrimaryBlue font-bold text-2xl"> TRUSTVIEW </h1>
        </div>

        <div className="flex space-x-2">
          <Link to={"/login"}>
            <button className="text-PrimaryBlue w-16 h-10 rounded-md font-bold text-md">
              Login
            </button>
          </Link>
          <Link to={"/business"}>
            <button className="bg-PrimaryBlue text-white text-sm w-36 h-10 rounded-md">
              FOR BUSINESS
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
