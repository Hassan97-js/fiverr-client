import { Link, NavLink } from "react-router-dom";

import Button from "./button";

import { setIsActive } from "../utils";

const NavLinks = () => {
  return (
    <ul className="flex items-center gap-8 font-medium mt-6 sm:mt-0" role="list">
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
          <Button variant="secondary">Join</Button>
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
