import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";

import { Navbar, Footer } from "../components";

import { ExternalUserSchema  } from "../constants/user-validator";
import type { TExternalUser } from "../types/user";

const Root = () => {
  const data = useLoaderData();

  let validUserData: null | TExternalUser = null;

  const validationResult = ExternalUserSchema.safeParse(data);

  if (validationResult.success) {
    validUserData = validationResult.data;
  }

  return (
    <>
      <Navbar user={validUserData?.user} />

      <main>
        <Outlet context={{ user: validUserData?.user }} />
      </main>

      <Footer />

      <ScrollRestoration />
    </>
  );
};

export default Root;
