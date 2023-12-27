import { useRevalidator } from "react-router-dom";

import Logo from "./logo";
import NavLinks from "./nav-links";

import { makeApiRequest, removeData, retrieveData } from "../utils";

import type { TUser } from "../types/user.types";
import { handleError } from "../utils/handle-error";
import UserMenu from "./user-menu";

type TProps = {
  user?: TUser | null;
};

const Navbar = ({ user }: TProps) => {
  const revalidator = useRevalidator();

  const handleSignOut = async () => {
    try {
      const token = retrieveData("token") ?? "";

      removeData("token");
      removeData("user");

      if (!token) {
        return;
      }

      await makeApiRequest({
        method: "post",
        url: "auth/sign-out",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      revalidator.revalidate();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <nav className="sticky top-0 z-10 transition-all bg-white drop-shadow-md px-8">
      <div className="container relative flex flex-row items-center justify-between gap-10 w-full py-5">
        <Logo />

        {!user ? (
          <NavLinks />
        ) : (
          <UserMenu
            onSignOut={handleSignOut}
            popoverClassName="flex justify-end items-center gap-3  user-menu-trigger"
            user={user}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
