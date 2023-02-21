import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Slider, HomeItem } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getLastestProducts,
  getTopProducts,
  getFavoriteProducts,
} from "../../store/actions";
import icons from "../../ultils/icons";
import { generatePath } from "../../ultils/fn";
import MenuNav from "../../components/MenuNav";

const { AiOutlineArrowRight, BiMenuAltLeft, RiSearchLine, VscBell } = icons;

const Home = () => {
  const dispatch = useDispatch();
  const { lastestProducts, topProducts, favoriteProducts } = useSelector(
    (state) => state.products
  );
  const { categories } = useSelector((state) => state.app);
  const [showMenuNav, setShowMenuNav] = useState(false);

  useEffect(() => {
    dispatch(
      getLastestProducts({ limitProduct: 4, order: ["createdAt", "DESC"] })
    );
    dispatch(
      getTopProducts({ limitProduct: 4, order: ["soldCounter", "DESC"] })
    );
    dispatch(
      getFavoriteProducts({ limitProduct: 4, order: ["scores", "DESC"] })
    );
  }, []);

  return (
    <div className="w-full bg-white">
      <MenuNav
        setShowMenuNav={setShowMenuNav}
        showMenuNav={showMenuNav}
      ></MenuNav>
      <div className="md:hidden">
        <div className="w-full h-6 bg-white"></div>
        <div className="h-[56px] flex items-center justify-between w-full py-[15px] px-4" onClick={()=>{setShowMenuNav(true)}}>
          <span className="flex items-center gap-5" >
            <BiMenuAltLeft size={26} />
            <span className="font-bold text-base">Home</span>
          </span>
          <span className="flex items-center gap-6">
            <Link to='tim-kiem'>
              <span>
                <RiSearchLine size={24} />
              </span>
            </Link>
            <span>
              <VscBell size={24} />
            </span>
          </span>
        </div>
      </div>
      <div className="w-full hidden md:flex flex-wrap px-4 items-center justify-center h-[50px] bg-[#E5E5E5] text-sm">
        <span className="text-center">
          <span className="mr-2">
            Chào mừng quý khách đến với cửa hàng tạp hóa Phương Thanh. Chúng tôi
            đang có rất nhiều deal hot dành riêng cho bạn
          </span>
          <Link
            to={path.DISCOUNT}
            className="text-blue-500 underline hover:text-orange-500"
          >
            ở đây
          </Link>
        </span>
      </div>
      <div className="py-6 mb-6 flex flex-col gap-8">
        <Slider />
        <HomeItem
          products={lastestProducts && lastestProducts}
          title="Sản phẩm mới về"
          navigate='/san-pham-moi-nhat'
          order='updatedAt'
        />
        <HomeItem
          products={topProducts && topProducts}
          v2={true}
          title="#topbanchay"
          navigate='/san-pham-ban-chay'
          order='soldCounter'
        />
        <HomeItem
          products={favoriteProducts && favoriteProducts}
          title="Sản phẩm được yêu thích nhất"
          navigate='/san-pham-yeu-thich'
        />
        {categories && (
          <div className="flex flex-col md:gap-10 gap-4 px-5">
            <Link
              to={`/${generatePath(categories[0]?.valueVi)}`}
              className="w-full relative"
            >
              <img
                className="w-full rounded-lg md:h-[400px] h-[132px] object-cover"
                src={categories && categories[0]?.image}
                alt="category"
              />
              <div className="absolute top-0 flex justify-center items-end md:gap-4 gap-3 flex-col md:pr-[61px] pr-4 left-0 right-0 bottom-0 rounded-lg bg-gradient-to-l text-white from-gray-500 to-transparent">
                <span className="md:text-[52px] text-lg font-bold">
                  {categories[0]?.valueVi}
                </span>
                <span className="p-3 hidden md:block bg-white w-fit text-black rounded-full">
                  <AiOutlineArrowRight size={20} />
                </span>
                <span className="p-2 md:hidden bg-white w-fit text-black rounded-full">
                  <AiOutlineArrowRight size={14} />
                </span>
              </div>
            </Link>
            <div className="w-full flex items-center md:gap-8 gap-4">
              <Link
                to={`/${generatePath(categories[1]?.valueVi)}`}
                className="w-full relative"
              >
                <img
                  className="w-full rounded-lg md:h-[228px] h-[100px] object-cover"
                  src={categories && categories[1]?.image}
                  alt="category"
                />
                <div className="absolute top-0 flex justify-center items-end md:gap-4 gap-3 flex-col md:pr-[61px] pr-4 left-0 right-0 bottom-0 rounded-lg bg-gradient-to-l text-white from-purple-800 to-transparent">
                  <span className="md:text-[52px] text-lg font-bold">
                    {categories[1]?.valueVi}
                  </span>
                  <span className="p-3 hidden md:block bg-white w-fit text-black rounded-full">
                    <AiOutlineArrowRight size={20} />
                  </span>
                  <span className="p-2 md:hidden bg-white w-fit text-black rounded-full">
                    <AiOutlineArrowRight size={14} />
                  </span>
                </div>
              </Link>
              <Link
                to={`/${generatePath(categories[2]?.valueVi)}`}
                className="w-full relative"
              >
                <img
                  className="w-full rounded-lg md:h-[228px] h-[100px] object-cover"
                  src={categories && categories[2]?.image}
                  alt="category"
                />
                <div className="absolute top-0 flex justify-center items-end md:gap-4 gap-3 flex-col md:pr-[61px] pr-4 left-0 right-0 bottom-0 rounded-lg bg-gradient-to-l text-white from-sky-800 to-transparent">
                  <span className="md:text-[52px] text-lg font-bold">
                    {categories[2]?.valueVi}
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
          </div>
        )}
      </div>
      <div className="h-[66px] flex-none"></div>
    </div>
  );
};

export default Home;
