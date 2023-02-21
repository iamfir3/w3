import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const Dropdown = ({ children,title, opened }) => {
  const [toggleArrow,setToggleArrow] = useState(opened||false);
  const activeRotate='rotate-90';
  const activeDropdown='';
  const dropdownClickHandler= ()=>{
    setToggleArrow(!toggleArrow);
  }
  return (
    <div>
      <div className="flex items-center justify-between mx-[16px] h-[48px]" onClick={dropdownClickHandler}>
        <p className="text-[14px] text-[#171520] font-semibold leading-5">{title}</p>
        {/* {toggleArrow ? (<IoIosArrowDown className="text-[#171520] " size='20'/>) :( <IoIosArrowForward className="text-[#171520] " size='20' />)} */}
        <IoIosArrowForward className={`text-[#171520] transition-all ${toggleArrow?activeRotate:''}`} size='20' />
      </div>
      <div className={`transition-all ${toggleArrow?activeDropdown:''}`}>{toggleArrow?children:""}</div>
    </div>
  );
};

export default Dropdown;
