import { useIdleTimer } from "react-idle-timer";

import { Outlet, useNavigate } from "react-router-dom";

import { Navbar, Footer } from "../components";
import { useCurrentUserContext } from "../context";

const Root = () => {
  const navigate = useNavigate();
  const { handleRemoveCurrentUser } = useCurrentUserContext();

  useIdleTimer({
    onIdle: () => {
      handleRemoveCurrentUser();
      navigate("/signin");
    },
    timeout: 10 * 60 * 1000
  });

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
