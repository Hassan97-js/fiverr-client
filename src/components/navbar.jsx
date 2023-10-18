import { useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import { useUserContext } from "../context";
import { capitalize, makeApiRequest, setIsActive } from "../utils";
import { useClickAway } from "../hooks";

const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const isOpen = useClickAway(dropdownRef);

  const { currentUser, handleRemoveCurrentUser } = useUserContext();

  const handleSignout = async () => {
    try {
      await makeApiRequest({ method: "post", url: "auth/signout" });

      handleRemoveCurrentUser();

      navigate("/signin");
    } catch (error) {
      throw Error(error);
    }
  };

  return (
    <nav className="sticky top-0 z-10 transition-all bg-white drop-shadow-md px-8">
      <div className="container relative flex flex-col sm:flex-row sm:justify-between w-full sm:gap-10 gap-3 items-center py-5">
        <div className="font-bold text-3xl">
          <Link to="." className="link" aria-label="Logo" title="Logo">
            fiverr
          </Link>

          <span className="text-green-400">.</span>
        </div>

        {!currentUser ? (
          <ul
            className="flex items-center gap-8 font-medium mt-6 sm:mt-0"
            role="list">
            <li className="link">
              <NavLink
                to="/signin"
                className={setIsActive}
                aria-label="Sign in"
                title="Sign in">
                Sign in
              </NavLink>
            </li>

            <li>
              <Link to="/signup" className="btn btn-secondary">
                Join
              </Link>
            </li>
          </ul>
        ) : (
          <div className="mt-6 sm:mt-0">
            <figure className="flex items-center gap-3 m-0 cursor-pointer">
              <figcaption className="select-none font-medium">
                {capitalize(currentUser?.username)}
              </figcaption>
              <img
                className="w-10 h-10 rounded-full object-cover object-center"
                src={currentUser?.image || "https://faces3.b-cdn.net/Colombia.png"}
                alt="Profile picture"
              />
            </figure>

            <div
              ref={dropdownRef}
              className={`absolute top-36 sm:top-24 right-0 z-[2000] flex flex-col gap-3 w-52 p-4 bg-white rounded-md border border-neutral-300 text-neutral-600 font-normal cursor-pointer transition-all ${
                isOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}>
              {currentUser.isSeller && (
                <>
                  <Link className="link" to="mygigs" aria-label="Gigs" title="Gigs">
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

              <Link className="link" to="orders" aria-label="Orders" title="Orders">
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

              <Link
                className="link"
                to="."
                aria-label="Log out"
                title="Log out"
                onClick={handleSignout}>
                Sign out
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
