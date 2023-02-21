import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";
import { generatePath } from "../../ultils/fn";
import Header from "../../components/Header";

const Category = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="min-h-screen">
      <Header>
        <p className="text-primary font-semibold text-[20px]">Gian hàng</p>
      </Header>
      {categories?.map((category, i) => {
        return (
          <div className="mb-[16px] mx-[16px]">
            <Link
              to={`/${generatePath(category?.valueVi)}`}
              className="w-full relative"
              key={i}
            >
              <img
                className="w-full rounded-lg md:h-[400px] h-[132px] object-cover"
                src={category && category?.image}
                alt="category"
              />
              <div className="absolute top-0 flex justify-center items-end md:gap-4 gap-3 flex-col md:pr-[61px] pr-4 left-0 right-0 bottom-0 rounded-lg bg-gradient-to-l text-white from-gray-500 to-transparent">
                <span className="md:text-[52px] text-lg font-bold">
                  {category?.valueVi}
                </span>
                <span className="p-3 hidden md:block bg-white w-fit text-black rounded-full">
                  <AiOutlineArrowRight size={20} />
                </span>
                <span className="p-2 md:hidden bg-white w-fit text-black rounded-full">
                  <AiOutlineArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        );
      })}
      <div className="h-[66px] bg-white"></div>
    </div>
  );
};

export default Category;
