import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Nav />
      {/* The main tag was previously in App.jsx around Routes, we keep it here to maintain layout structure */}
      <main className="main-content" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
