import React, { memo } from "react";
import {Link} from "react-router-dom";
import LongButton from "./LongButton";

const BillItem = ({id, image, name, cost, qty }) => {
  return (
    <div className="flex gap-[16px] items-center [&:not(:last-child)]:mb-[32px]">
      <div className="w-[120px] h-[120px]">
        <img src={image} className="rounded-[8px] object-fit" alt="hihi"></img>
      </div>
      <div>
        <p className="text-black font-semibold text-[12px]">{name}</p>
        <p className="text-black font-semibold text-[14px]">đ{Number(cost.toFixed(1)).toLocaleString()}</p>
        <p className="text-darkGrey font-medium text-[12px]">Số lượng: {qty}</p>
        <div className="border-[2px] border-primary rounded-[8px]">
          <LongButton >
            <Link to={`/chi-tiet-san-pham/${id}`} className="text-primary font-semibold text-[14px] px-[36.5px] py-[4px]">Chi tiết sản phẩm</Link>
          </LongButton>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BillItem);
