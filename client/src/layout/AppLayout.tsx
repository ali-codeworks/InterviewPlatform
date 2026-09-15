import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const AppLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {!isLandingPage && <Footer />}
    </>
  );
};
