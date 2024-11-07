import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authData, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (authData) {
      navigate(`/dashboard/business/${authData.id}/invite-review`);
    } else {
      navigate("/login/business");
    }
  };

  return (
    <header className="container bg-white w-full mx-auto py-2 px-4">
      <div className="flex items-center justify-between">
        <div>
          <Link to={"/business"}>
            <h1 className="text-PrimaryBlue font-bold text-2xl"> TRUSTVIEW </h1>
          </Link>
        </div>

        <div
          id="menu"
          className={`fixed top-0 ${
            menuOpen ? "menu-open" : "menu-close"
          } bg-slate-200 h-screen px-16 py-16 flex flex-col space-y-6 items-center justify-start md:h-full md:flex-row md:space-x-6 md:space-y-0 md:relative md:top-0 md:right-0 md:bg-white md:p-0 md:m-0`}
        >
          <a href="/" className="hover:font-semibold hover:text-PrimaryBlue">
            For users
          </a>
          <button
            onClick={handleRedirect}
            className="hover:font-semibold hover:text-PrimaryBlue"
          >
            Send Review Invite
          </button>
          {/* if user logged in, show user name and profile icon */}
          {loggedIn && authData.role === "company" ? (
            <div className="flex flex-col md:flex-row space-x-3 items-center">
              <img
                src="data:image/png;base64,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"
                alt="profile Image"
                className="rounded-full w-12 h-12"
              />
              <p>{authData.name}</p>
              <a
                href={`/dashboard/business/${authData.id}/reviews`}
                className="hover:font-semibold hover:text-PrimaryBlue"
              >
                Dashboard
              </a>
            </div>
          ) : (
            <div className="flex flex-col space-y-6 items-center md:space-x-6 md:flex-row md:space-y-0">
              <a
                href="/login/business"
                className="hover:font-semibold hover:text-PrimaryBlue"
              >
                Login
              </a>
              <Link to={"/register/business"}>
                <button className="bg-PrimaryBlue text-white text-sm w-36 h-10 rounded-md">
                  Get Started
                </button>
              </Link>
            </div>
          )}
        </div>

        <button
          id="menu-btn"
          className={`${
            menuOpen && "open"
          } block hamburger md:hidden focus:outline-none`}
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
    </header>
  );
};
