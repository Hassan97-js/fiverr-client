import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";

import { Navbar, Footer } from "../components";
// import { useUserContext } from "../context";

const Root = () => {
  // const data = useLoaderData();
  // const navigate = useNavigate();
  // const { handleRemoveCurrentUser } = useUserContext();

  // console.log(data);

  /**
   1. Get user using current token in loader
      - If token expired redirect to /sign-in page
        - remove the currentUser from session storage
   2. Save currentUser in outletContext
   3. Consume the currentUser in the routes
  */

  // useIdleTimer({
  //   onIdle: () => {
  //     handleRemoveCurrentUser();
  //     navigate("/signin");
  //   },
  //   timeout: 15 * 60 * 1000
  // });

  return (
    <>
      {/* <Navbar /> */}

      <main>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default Root;
