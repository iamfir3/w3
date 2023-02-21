import { IoIosArrowForward } from "react-icons/io";
import {Link} from "react-router-dom";

const ProductCardforSearching = ({ id,image, name, shortDes, costPerUnit }) => {
  return (
    <div className="flex h-[126px] w-full justify-center items-center">
      <div className="w-[100px] h-[100px] flex-none">
        <img src={image} className='w-[75px] h-[80px] rounded-[8px]' alt="hi"></img>
      </div>
      <div className="flex-auto">
        <p className="font-medium text-[16px] text-black">{name}</p>
        <p className="font-[400] text-[16px] text-darkGrey">{shortDes}</p>
        <p className="font-medium text-black text-[14px]">{costPerUnit}</p>
      </div>
      <div className="w-[30px] flex-none">
        <IoIosArrowForward className="text-[#171520] " size="26" />
      </div>
    </div>
  );
};

export default ProductCardforSearching;
