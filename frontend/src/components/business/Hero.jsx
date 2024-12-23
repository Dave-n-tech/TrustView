import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export const Hero = () => {
  const {authData, loggedIn} = useContext(AuthContext);

  return (
    <section className="w-full flex flex-col space-y-4 py-8 items-center justify-center text-center">
      <h1 className="max-w-3xl text-4xl text-PrimaryBlue font-bold md:text-5xl">
        Manage Reviews, Build Trust, Grow Your Brand
      </h1>
      <p className="max-w-lg text-gray-800">
        Harness the power of reviews to strengthen relationships, improve
        services, and boost your reputation—all from one easy-to-use platform.
      </p>
      {loggedIn && authData.role === "company" ? (
        <Link to={`/dashboard/business/${authData.id}/reviews`}>
        <button className="bg-PrimaryBlue text-white text-sm w-36 h-10 rounded-md">
          Dashboard
        </button>
      </Link>
      ) : (
        <Link to={"/register/business"}>
        <button className="bg-PrimaryBlue text-white text-sm w-36 h-10 rounded-md">
          Get Started
        </button>
      </Link>
      )}
    </section>
  );
};
