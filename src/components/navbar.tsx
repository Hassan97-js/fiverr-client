import { useState } from "react";
import { NavLink, Link, useRevalidator } from "react-router-dom";

import Button from "./button";

import {
  capitalize,
  makeApiRequest,
  removeData,
  retrieveData,
  setIsActive
} from "../utils";

import type { TUser } from "../types/user.types";
import { handleError } from "../utils/handle-error";
import UserMenu from "./user-menu";

type TProps = {
  user?: TUser | null;
};

const Navbar = ({ user }: TProps) => {
  const revalidator = useRevalidator();

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      const token = retrieveData("token") ?? "";

      removeData("token");
      removeData("user");

      if (!token) {
        return;
      }

      const response = await makeApiRequest({
        method: "post",
        url: "auth/sign-out",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      revalidator.revalidate();

      setIsOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <nav className="sticky top-0 z-10 transition-all bg-white drop-shadow-md px-8">
      <div className="container relative flex flex-row items-center justify-between gap-10 w-full py-5">
        <div className="font-bold text-3xl">
          <Link to="." className="link" aria-label="Logo" title="Logo">
            fiverr
          </Link>

          <span className="text-green-400">.</span>
        </div>

        {/* Todo: Extract ul to a separate component */}
        {!user ? (
          <ul
            className="flex items-center gap-8 font-medium mt-6 sm:mt-0"
            role="list">
            <li className="link">
              <NavLink
                to="/sign-in"
                className={setIsActive}
                aria-label="Sign in"
                title="Sign in">
                Sign in
              </NavLink>
            </li>

            <li>
              <Link to="/sign-up" className="btn btn-secondary">
                Join
              </Link>
            </li>
          </ul>
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

/* 


      {/* -------------------------- User Menu  -------------------------- */
