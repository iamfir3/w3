import React, { memo } from "react";
import vnd from "../assets/vnd.png";
import { Link } from "react-router-dom";
import { path } from "../ultils/constant";
import * as actions from "../store/actions/";
import { AiFillStar } from "react-icons/ai";

const ProductItem = ({
  image,
  title,
  description,
  cost,
  v2,
  productId,
  soldCounter,
  votedCounter,
}) => {
  const handleRenderStar = (starValue) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= +starValue) {
        stars = [...stars, <AiFillStar className="text-yellow lg:text-[24px] text-[12px] md:text-[16px]" />];
      } else {
        stars = [
          ...stars,
          <AiFillStar className="text-darkGrey-tint lg:text-[24px] text-[12px] md:text-[16px]" />,
        ];
      }
    }
    return stars;
  };
  return (
    <Link
      to={`/${path.DETAIL}/${productId}`}
      className={`md:w-[286px] w-[150px] flex flex-col gap-2 ${
        v2 ? "rounded-xl" : "pb-[41px] rounded-md"
      } relative bg-white`}
      key={productId}
    >
      <img
        className={`w-full md:h-[286px] h-[138px] object-cover ${
          v2 ? "rounded-xl" : "rounded-md border border-gray-200"
        }`}
        src={image}
        alt="product"
      />
      {v2 && (
        <div className="bg-gradient-to-t from-[rgba(255,255,255,0.5)] rounded-xl to-transparent absolute top-0 w-full md:h-[286px] h-[138px] z-40"></div>
      )}
      <span
        className={`font-bold text-black  ${
          v2
            ? "absolute md:top-[246px] top-[115px] z-50 md:text-[24px] text-base left-4"
            : ""
        }`}
      >
        {title}
      </span>
      {!v2 && (
        <div className="flex flex-col gap-2">
          <span className="font-bold flex items-center gap-1">
            <img src={vnd} alt="vnd" className="w-4 h-4 object-cover" />
            <span>{Number(cost.toFixed(1)).toLocaleString()}</span>
          </span>
          <div className="flex items-center justify-between">
            <span className="flex">{handleRenderStar(votedCounter)}</span>
            <span className="text-[12px] md:text-[14px] lg:text-[16px]">Đã bán {soldCounter}</span>
          </div>
        </div>
      )}
    </Link>
  );
};

export default memo(ProductItem);
