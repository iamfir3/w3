import React from "react";
import { NavLink, Link } from "react-router-dom";
import { adminMenu } from "../../ultils/constant";

const activeStyle =
  "py-4 pl-4 flex items-center gap-2 bg-[#46546C] text-white font-medium";
const notActiveStyle = "py-4 pl-4 flex items-center gap-2 hover:bg-[#46546C]";

const Sidebar = () => {
  return (
    <div className="w-256  flex-none bg-[#3C4B64] h-full text-gray-300 flex flex-col justify-between ">
      <div className="flex flex-col">
        <Link
          to="/"
          className="h-[64px] flex justify-center items-center bg-[#303C54] text-white font-semibold"
        >
          PHUONGTHANHSHOP
        </Link>
        <div className="flex flex-col">
          {adminMenu.map((i) => {
            return (
              <NavLink
                key={i.path}
                to={i.path}
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
              >
                {i.icon}
                {i.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      <Link
        to={"/"}
        className="py-4 flex items-center justify-center hover:underline hover:text-white"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
};
export default Sidebar;
