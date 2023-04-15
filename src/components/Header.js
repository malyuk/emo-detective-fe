import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const navigationItems = [{ path: "/dashboard", name: "Dashboard" }];

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="flex justify-between text-lg bg-slate-200 py-4 px-6 shadow-sm">
      <Link to="/">
        <img
          style={{ width: "92px", height: "40px" }}
          src="/learnazium-logo.svg"
        ></img>
      </Link>
      <ul className="flex gap-8">
        {user && (
          <Link to={navigationItems[0].path}>{navigationItems[0].name}</Link>
        )}

        {user && (
          <div className="border-l-2  border-slate-300 pl-6 flex gap-2 items-center">
            {user.displayName ? (
              <div className="font-bold">Hi, {user.displayName}</div>
            ) : null}
            <img
              className="h-8 w-8 rounded-full mr-2"
              src={user.photoURL}
              alt={`User avatar for ${user.displayName}`}
            />
          </div>
        )}
      </ul>
    </div>
  );
};

export default Header;
