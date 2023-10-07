import { Outlet } from "react-router-dom";

import { Navbar, Footer } from "../components";

const Root = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
