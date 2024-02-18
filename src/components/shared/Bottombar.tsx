import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-between px-6 sm:px-14  md:hidden sticky bottom-0">
      {bottombarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`${
              isActive &&
              "bg-primary-500 rounded-[10px] flex-center flex-col gap-1 p-2 transition"
            }`}
          >
            <img
              src={link.imgURL}
              className={`group-hover:invert-white ${
                isActive && "invert-white"
              }`}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Bottombar;
