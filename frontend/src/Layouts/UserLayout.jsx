import { Outlet } from "react-router-dom";
import { Navbar } from "../components/user/Navbar";
import { Footer } from "../components/shared/Footer";

export const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main className="user-main-content">
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};
