import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export const SidebarMenu = () => {
  const { authData, loggedIn } = useContext(AuthContext);
  const id = authData?.id;

  return (
    <div className="bg-PrimaryBlue w-64 h-full text-white fixed top-0 left-0 py-6 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
      <NavLink to="/business">
        <p className="hover:font-bold mb-6 text-left"> {"<- "}back to home</p>
      </NavLink>
      <ul className="space-y-4">
        <li>
        {loggedIn && authData.role === "company" && (
            <div className="flex flex-col md:flex-row space-x-3 items-start md:items-center">
              <img
                src="data:image/png;base64,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"
                alt="profile Image"
                className="rounded-full w-12 h-12"
              />
              <p>{authData.name}</p>
            </div>
          )}
        </li>
        <li>
          <NavLink
            to={`/dashboard/business/${id}/reviews`}
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-blue-600'}`
            }
          >
            View Reviews
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/dashboard/business/${id}/invite-review`}
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-blue-600'}`
            }
          >
            Send Review Invite
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/dashboard/business/${id}/analytics`}
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-blue-600'}`
            }
          >
            Review Analytics
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/dashboard/business/${id}/profile-settings`}
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-blue-600'}`
            }
          >
            Profile Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
