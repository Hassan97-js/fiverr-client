import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";

import { Navbar, Footer } from "../components";

import { ExternalUserSchema, type TExternalUser } from "../constants/validators/user-validator";

const Root = () => {
  const data = useLoaderData();

  let userData: null | TExternalUser = null;

  const validationResult = ExternalUserSchema.safeParse(data);

  if (validationResult.success) {
    userData = validationResult.data;
  }

  return (
    <>
      <Navbar user={userData?.user} />

      <main>
        <Outlet context={{ user: userData?.user }} />
      </main>

      <Footer />

      <ScrollRestoration />
    </>
  );
};

export default Root;
