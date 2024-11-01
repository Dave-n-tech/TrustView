import { Outlet } from "react-router-dom";
import { Footer } from "../components/shared/Footer";
import { Header } from "../components/business/Header";

export const BusinessLayout = () => {
  return (
    <>
      <Header />
      <main className="business-main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
