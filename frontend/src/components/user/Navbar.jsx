import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";

export const Navbar = () => {
  const { authData, loggedIn } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // console.log(authData);
  return (
    <header className="container bg-white w-full mx-auto py-2 px-4">
      <div className="flex items-center justify-between">
        <div>
          <Link to={"/"}>
            <h1 className="text-PrimaryBlue font-bold text-2xl"> TRUSTVIEW </h1>
          </Link>
        </div>

        <div
          id="menu"
          className={`fixed top-0 ${menuOpen ? "menu-open" : "menu-close"} bg-slate-200 h-screen px-16 py-16 flex flex-col space-y-6 items-center justify-start md:h-full md:flex-row md:space-x-6 md:space-y-0 md:relative md:top-0 md:right-0 md:bg-white md:p-0 md:m-0`}
        >
          <a
            href="#reviews"
            className="hover:font-semibold hover:text-PrimaryBlue"
          >
            Read Reviews
          </a>
          {/* if user logged in, show user name and profile icon */}
          {authData !== null ? (
            <div className="flex flex-col md:flex-row space-x-3 items-center">
              <img
                src="https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
                alt="profile Image"
                className="rounded-full w-12 h-12"
              />
              <p>{authData.username}</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-6 items-center md:space-x-6 md:flex-row md:space-y-0">
              <a
                href="/login"
                className="hover:font-semibold hover:text-PrimaryBlue"
              >
                Login
              </a>
              <a
                href="/register/user"
                className="hover:font-semibold hover:text-PrimaryBlue"
              >
                Register
              </a>
            </div>
          )}

          <Link to={"/business"}>
            <button className="bg-PrimaryBlue text-white text-sm w-36 h-10 rounded-md">
              FOR BUSINESS
            </button>
          </Link>
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
