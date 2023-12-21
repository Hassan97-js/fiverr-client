import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";

import { Navbar, Footer } from "../components";

import { loaderDataUserSchema } from "../constants/user-validator";
import type { TLoaderDataUser } from "../types/user";

const Root = () => {
  const data = useLoaderData();

  let validUserData: null | TLoaderDataUser = null;

  const validationResult = loaderDataUserSchema.safeParse(data);

  if (validationResult.success) {
    validUserData = validationResult.data;
  }

  return (
    <>
      <Navbar currentUser={validUserData?.user} />

      <main>
        <Outlet context={{ currentUser: validUserData?.user }} />
      </main>

      <Footer />

      <ScrollRestoration />
    </>
  );
};

export default Root;
