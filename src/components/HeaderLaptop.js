import React from "react";
import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { generatePath } from "../ultils/fn";
import { Search } from "./";
import icons from "../ultils/icons";
import { path } from "../ultils/constant";
import ApiCart from "../apis/cart";
import * as actions from "../store/actions";

const { RiUser6Line, AiOutlineShoppingCart, BsDot } = icons;

const HeaderLaptop = () => {
  const { fetchCartQuantity, productsCart } = useSelector((state) => {
    return state.cart;
  });

  const [cartQuantity, setCartQuantity] = useState(productsCart?.length);

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      const fetchCartQuantity = async () => {
        const res = await ApiCart.get();
        setCartQuantity(res.yourCart.length);
      };
      fetchCartQuantity();
    }, 100);
  }, [fetchCartQuantity, cartQuantity, productsCart]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="w-full h-full flex items-center justify-between px-5 py-[18px]">
      <div className="flex items-center gap-8 flex-auto">
        <Link
          to={"/" + path.HOME}
          className="font-lemonada font-semibold text-[#17494D] text-[25px] leading-8"
        >
          PHƯƠNGTHANH
        </Link>
        <div className="lg:flex hidden items-center gap-5">
          {categories?.map((item) => (
            <NavLink
              key={item.code}
              to={`/${generatePath(item.valueVi)}`}
              className="font-bold"
            >
              {item.valueVi}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-[50%] flex-none flex justify-between items-center gap-5">
        <Search />
        <div
          className=" flex items-center justify-end gap-5 flex-none"
          style={{ width: isLoggedIn ? "60px" : "180px" }}
        >
          <Link to={`/${path.PROFILE}`}>
            {isLoggedIn ? (
              <RiUser6Line size={24} />
            ) : (
              <p className="text-[14px] font-semibold">Đăng nhập/Đăng kí</p>
            )}
          </Link>
          <span className="relative">
            <Link to="/cart">
              <AiOutlineShoppingCart
                size={26}
                className={`${
                  fetchCartQuantity === "success" ||
                  fetchCartQuantity === "warning"
                    ? "animate-bounce2"
                    : ""
                }`}
                style={{ "animation-iteration-count": "5" }}
              />
              <span
                className={`absolute top-[-3px] right-[-3px] w-[15px] h-[15px] bg-orange-600 rounded-full text-white text-[8px] flex items-center justify-center ${
                  fetchCartQuantity === "success" ||
                  fetchCartQuantity === "warning"
                    ? "animate-bounce2"
                    : ""
                }`}
                style={{ "animation-iteration-count": "5" }}
              >
                {isLoggedIn ? cartQuantity : "0"}
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderLaptop);
