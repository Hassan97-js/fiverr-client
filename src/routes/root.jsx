import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";

import { Navbar, Footer } from "../components";

const Root = () => {
  const data = useLoaderData();

  return (
    <>
      <Navbar currentUser={data?.currentUser} />

      <main>
        <Outlet context={{ currentUser: data?.currentUser }} />
      </main>

      <Footer />

      <ScrollRestoration />
    </>
  );
};

export default Root;
