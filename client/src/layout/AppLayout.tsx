import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LandingHeader } from "../components/block/LandingHeader";

const PRIVATE_PATHS = ["/dashboard"];

export const AppLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isPrivatePage = PRIVATE_PATHS.includes(location.pathname);

  return (
    <>
      {isLandingPage && <LandingHeader />}
      {isPrivatePage && <Header />}
      <main>
        <Outlet />
      </main>
      {isPrivatePage && <Footer />}
    </>
  );
};
