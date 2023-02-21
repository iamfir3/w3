import {IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { generatePath } from "../ultils/fn";

const SideNavigateMenu = ({ children,title }) => {
  return (
    <div>
      <div className="flex items-center justify-between mx-[16px] h-[48px]">
        <p className="text-[14px] text-[#171520] font-semibold leading-5">{title}</p>
        <IoIosArrowForward className="text-[#171520] " size='20' />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SideNavigateMenu;
