import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";

import Button from "./button";

import { cn } from "../utils";

import { type TUser } from "../constants/validators/user-validator";

const userMenuLinks = [
  {
    id: 1,
    to: "/",
    text: "Home",
    sellerOnly: false
  },
  {
    id: 2,
    to: "private-gigs",
    text: "My Gigs",
    sellerOnly: true
  },
  {
    id: 3,
    to: "add",
    text: "Add new gig",
    sellerOnly: true
  },
  {
    id: 4,
    to: "orders",
    text: "Orders",
    sellerOnly: false
  },
  {
    id: 5,
    to: "gigs",
    text: "Gigs",
    sellerOnly: false
  },
  {
    id: 6,
    to: "chats",
    text: "Chats",
    sellerOnly: false
  }
];

type TUserMenuProps = {
  user: TUser;
  popoverClassName?: string;
  onSignOut: () => void;
};

const UserMenu = ({ user, popoverClassName, onSignOut }: TUserMenuProps) => {
  return (
    <div className={cn("w-full max-w-sm", popoverClassName)}>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
            ${open ? "text-white" : "text-white/90"}
            group flex items-center rounded-md text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}>
              <div className="w-10 h-10 rounded-full min-w-[2.5rem] overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center"
                  src={user?.image || "/avatar1.jpg"}
                  alt="Profile picture"
                />
              </div>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute right-0 z-10 mt-8 w-screen max-w-sm px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    <div className="col-span-2 flex items-center gap-2 mb-2">
                      <p className="text-gray-500 text-sm">Logged in as:</p>
                      <p className="font-semibold">{user.username.toUpperCase()}</p>
                    </div>
                    {userMenuLinks.map((link) => {
                      if (!user.isSeller && link.sellerOnly) {
                        return null;
                      }

                      return (
                        <Link
                          onClick={() => close()}
                          key={link.id}
                          to={link.to}
                          className="-mt-4 -mx-2  flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-green-500/50">
                          <span className="text-sm font-medium text-gray-600">{link.text}</span>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="bg-gray-50 p-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={onSignOut}
                      className="link self-start"
                      aria-label="Log out"
                      title="Log out">
                      Sign out
                    </Button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default UserMenu;
