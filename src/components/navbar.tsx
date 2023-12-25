import { useState } from "react";
import { NavLink, Link, Form } from "react-router-dom";

import { capitalize, setIsActive } from "../utils";

import type { TUser } from "../types/user.types";

type TProps = {
  user?: TUser | null;
};

const Navbar = ({ user }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 transition-all bg-white drop-shadow-md px-8">
      <div className="container relative flex flex-row items-center justify-between gap-10 w-full py-5">
        <div className="font-bold text-3xl">
          <Link to="." className="link" aria-label="Logo" title="Logo">
            fiverr
          </Link>

          <span className="text-green-400">.</span>
        </div>

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
          <>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 m-0 cursor-pointer user-menu-trigger">
              <span className="select-none font-medium">
                {capitalize(user?.username)}
              </span>
              <img
                className="w-10 h-10 flex-shrink-0 rounded-full object-cover object-center"
                src={user?.image || "/public/avatar1.jpg"}
                alt="Profile picture"
              />
            </button>

            {isOpen && (
              <div className="absolute top-24 right-0 z-[2000] flex flex-col gap-3 w-52 p-4 bg-white rounded-md border border-neutral-300 text-neutral-600 font-normal cursor-pointer transition">
                {user.isSeller && (
                  <>
                    <Link
                      className="link"
                      to="private-gigs"
                      aria-label="Gigs"
                      title="Gigs">
                      My Gigs
                    </Link>

                    <Link
                      className="link"
                      to="/add"
                      aria-label="Add New Gig"
                      title="Add New Gig">
                      Add New Gig
                    </Link>
                  </>
                )}

                <Link
                  className="link"
                  to="orders"
                  aria-label="Orders"
                  title="Orders">
                  Orders
                </Link>

                <Link className="link" to="gigs" aria-label="Gigs" title="Orders">
                  Gigs
                </Link>

                <Link
                  className="link"
                  to="messages"
                  aria-label="Messages"
                  title="Messages">
                  Messages
                </Link>

                <Form method="post" action="/">
                  <button className="link" aria-label="Log out" title="Log out">
                    Sign out
                  </button>
                </Form>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
