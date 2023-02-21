import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import vnd from "../assets/vnd.png";
import icons from "../ultils/icons";

const { MdNavigateNext } = icons;

const OrderItem = ({ oid, createAt, total, status }) => {
  return (
    <div>
      <div className="w-full cursor-pointer rounded-md relative bg-[#f1f1f1] md:text-[14px] lg:text-[16px]  text-black items-center px-6 py-5 hidden md:flex">
        <span className="flex gap-2 flex-1 items-center justify-center">
          {/* <input type="checkbox" className="lg:w-6 lg:h-6 md:w-4 md:h-4" /> */}
          <span className="">{`#${oid?.replace(/\D/g, "")?.slice(0, 9)}`}</span>
        </span>
        <span className="flex-1 flex justify-center md:text-[14px] lg:text-[16px] items-center">
          {moment(createAt).format("DD/MM/YYYY")}
        </span>
        <span className="flex-1 flex justify-center items-center gap-1">
          <img src={vnd} alt="vnd" className="w-[14px] h-[14px] object-cover" />
          <span>{Number(total.toFixed(1)).toLocaleString()}</span>
        </span>
        <span className="flex-1 flex justify-center items-center">
          {status === "pending"
            ? "Đang gói hàng"
            :status==="shipping"?"Đang vận chuyển"
            : status === "completed"
            ? "Hoàn thành"
            : "Đã hủy"}
        </span>
        <span className="absolute top-0 bottom-0 right-2 flex items-center">
          <MdNavigateNext size={24} />
        </span>
      </div>

      <div>
        <div className="w-full cursor-pointer rounded-[8px] relative bg-[#f1f1f1] text-black flex items-center px-6 py-5 md:hidden">
          <div className="flex flex-col items-start gap-[8px]">
            <span className="flex-1 flex justify-center items-center text-lightGrey2 font-medium text-[16px]">
              {moment(createAt).format("DD/MM/YYYY")}
            </span>
            <span className="flex gap-2 flex-1 items-center justify-center font-medium text-black text-[16px]">
              <span>{`#${oid?.replace(/\D/g, "")?.slice(0, 9)}`}</span>
            </span>
            <span className="flex-1 flex justify-center items-center gap-1 font-medium text-black text-[16px]">
              
              <span>đ{Number(total.toFixed(1)).toLocaleString()}</span>
            </span>
          </div>
          <span className="absolute top-0 bottom-0 right-2 flex items-center text-darkGrey">
            <MdNavigateNext size={35} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(OrderItem);
