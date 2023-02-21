import React, { memo, useState, useEffect, useRef } from "react";
import ApiProduct from "../apis/product";
import icons from "../ultils/icons";
import ProductCardforSearching from "./ProductCartforSearching";
import { LoadingPageDesktop } from "../components/LoadingPage";
import SearchNotFound from "../assets/SearchNotFound.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const { RiSearchLine } = icons;
const Search = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [products, setProducts] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await ApiProduct.getProductByIdClient({
        name: searchKeyword,
        limitProduct: 5,
      });
      setProducts(res?.productData?.rows);
      if (res.productData.rows.length !== 0) {
        setSearchNotFound(false);
      } else {
        setSearchNotFound(true);
      }
      setIsLoading(false);
    };

    if (searchKeyword.length !== 0) fetchProducts();
  }, [searchKeyword]);
  return (
    <div className="relative w-full">
      <div className="flex-auto flex items-center h-[48px]">
        <span className="pl-2 bg-[#F1F1F1] h-full flex items-center rounded-l-md">
          <RiSearchLine size={24} />
        </span>
        <input
          type="text"
          className="w-full px-5 py-[12px] bg-[#F1F1F1] placeholder:text-gray-800 rounded-r-md outline-none"
          placeholder="Tìm sản phẩm....."
          onFocus={() => {
            setIsSearching(true);
          }}
          onBlur={() => {
            setIsSearching(false);
          }}
          onChange={(e) => {
            setTimeout(() => {
              setSearchKeyword(e.target.value);
            }, 800);
            setIsLoading(true);
          }}
        />
      </div>

      {isSearching && searchKeyword.length !== 0 && (
        <>
          <div className="absolute w-full bg-white z-60 drop-shadow-md top-[60px] rounded-[8px]gap-[24px] p-[8px]">
            {searchNotFound && !isLoading && (
              <div className="flex flex-col gap-[16px] justify-center items-center">
                <img src={SearchNotFound} className="h-[300px] w-[297px]"></img>
                <p className="font-bold text-primary text-[28px] text-center mt-[8px]">
                  Whoops!
                </p>
                <p className="font-medium text-black text-[14px] text-center px-[26px] pb-[26px]">
                  Rất tiếc chúng tôi không tìm thấy sản phẩm bạn đang tìm kiếm.
                  Hãy thử tìm kiếm bằng từ khóa khác
                </p>
              </div>
            )}
            {!searchNotFound && (
              <div className="flex flex-col gap-[16px]  h-[718px]">
                {isLoading && <LoadingPageDesktop />}
                {products?.map((product, i) => {
                  return (
                    <div
                      onMouseDown={() => {
                        navigate(`/chi-tiet-san-pham/${product.id}`);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <ProductCardforSearching
                        key={i}
                        id={product.id}
                        image={product.mainImage}
                        name={product.name}
                        shortDes="This is short description"
                        costPerUnit={product.costPerUnit}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {!searchNotFound && (
              <p
                className="text-primary text-center font-bold cursor-pointer"
                onMouseDown={() => {
                  dispatch(
                    actions.getProducts({
                      name: searchKeyword,
                      limitProduct: 10,
                    })
                  );
                  dispatch(actions.setSearchKeyword(searchKeyword));
                  navigate(`/tim-kiem/${searchKeyword}`);
                }}
              >
                Xem tất cả
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Search);
