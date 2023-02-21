import ApiProduct from "../apis/product";
import React, { useState } from "react";
import Header from "./Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import Swal from "sweetalert2";

const VoteProductPopup = ({ products, isVoting, setIsVoting }) => {
  const [point, setPoint] = useState(
    new Array(products?.length).fill({ stars: new Array(5).fill(0), point: 0 })
  );
  const handleVote = (point, productIndex) => {
    const newPoint = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= point) {
        newPoint.push(1);
      } else newPoint.push(0);
    }
    setPoint((prev) => {
      prev[productIndex] = { stars: newPoint, point: point };
      return [...prev];
    });
  };
  return (
    <div
      className={`fixed transition-all z-20 top-0 left-0 ${
        !isVoting ? "translate-x-[100%]" : "translate-x-[0]"
      }`}
    >
      <div className={`md:hidden w-screen h-screen bg-white`}>
        <Header>
          <MdOutlineArrowBackIosNew
            size="24"
            className="text-primary"
            onClick={(e) => {
              e.stopPropagation();
              setIsVoting(false);
            }}
          />
          <p className="text-[20px] text-primary font-semibold pl-[20px]">
            Đánh giá sản phẩm
          </p>
        </Header>
        <div
          className={`mt-[16px] overflow-y-auto `}
          style={{ height: window.innerHeight - 66 + "px" }}
        >
          {products?.map((product, index) => {
            return (
              <div className="flex flex-col justify-center [&:not(:last-child)]:mb-[20px] pb-[20px] [&:not(:last-child)]:border-b-[1px] [&:not(:last-child)]:border-lightGrey px-[16px]">
                <div className="flex gap-[16px] items-center w-full">
                  <div className="w-[120px] h-[120px]">
                    <img
                      src={product?.products?.mainImage}
                      className="rounded-[8px] object-fit"
                      alt="hihi"
                    ></img>
                  </div>
                  <div>
                    <p className="text-black font-semibold text-[14px]">
                      {product?.products?.name}
                    </p>
                    <p className="text-black font-semibold text-[16px]">
                      đ{Number(product?.cost.toFixed(1)).toLocaleString()}
                    </p>
                    <p className="text-darkGrey font-medium text-[14px]">
                      Số lượng: {product?.qty}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-[10px]">
                  <p className="text-[14px] font-500">
                    Bạn đánh giá sản phẩm này như thế nào?
                  </p>
                  <div className="flex justify-center">
                    {point[index]?.stars?.map((star, i) => {
                      return star === 0 ? (
                        <AiOutlineStar
                          className="text-[35px] text-darkGrey"
                          onClick={() => {
                            handleVote(i + 1, index);
                          }}
                        ></AiOutlineStar>
                      ) : (
                        <AiFillStar
                          className="text-yellow text-[35px] text-darkGrey"
                          onClick={() => {
                            handleVote(i + 1, index);
                          }}
                        ></AiFillStar>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-center w-full mt-[14px]">
                  <button
                    className="text-white bg-primary rounded-[8px] w-[95%] h-[40px]"
                    onClick={() => {
                      const vote = async () => {
                        const res = await ApiProduct.voteProduct({
                          id: product.pid,
                          scores: point[index].point,
                        });
                        if (res.status === 0) {
                          Swal.fire(
                            "Thành công",
                            "Đánh giá sản phẩm thành công",
                            "success"
                          );
                        }
                        console.log(res);
                      };
                      vote();
                    }}
                  >
                    Gửi đánh giá
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="hidden md:flex justify-center items-center w-screen h-screen bg-[rgba(0,0,0,.25)]"
        onClick={() => {
          setIsVoting(false);
        }}
      >
        <div
          className="bg-white w-[70%] rounded-[10px] p-[16px]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex justify-end text-[24px] text-primary">
            <GiCancel
              onClick={(e) => {
                e.stopPropagation();
                setIsVoting(false);
              }}
            ></GiCancel>
          </div>
          <div
            className={`mt-[16px] overflow-y-auto flex flex-wrap items-start`}
            style={{ height: window.innerHeight - 200 + "px" }}
          >
            {products?.map((product, index) => {
              return (
                <div className="flex flex-col  justify-center [&:not(:last-child)]:mb-[20px] pb-[20px] [&:not(:last-child)]:border-b-[1px] [&:not(:last-child)]:border-lightGrey px-[16px]">
                  <div className="flex gap-[16px] items-center w-full">
                    <div className="w-[120px] h-[120px]">
                      <img
                        src={product?.products?.mainImage}
                        className="rounded-[8px] object-fit"
                        alt="hihi"
                      ></img>
                    </div>
                    <div>
                      <p className="text-black font-semibold text-[14px]">
                        {product?.products?.name}
                      </p>
                      <p className="text-black font-semibold text-[16px]">
                        đ{Number(product?.cost.toFixed(1)).toLocaleString()}
                      </p>
                      <p className="text-darkGrey font-medium text-[14px]">
                        Số lượng: {product?.qty}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-[10px]">
                    <p className="text-[14px] font-500">
                      Bạn đánh giá sản phẩm này như thế nào?
                    </p>
                    <div className="flex justify-center">
                      {point[index]?.stars?.map((star, i) => {
                        return star === 0 ? (
                          <AiOutlineStar
                            className="text-[35px] text-darkGrey"
                            onClick={() => {
                              handleVote(i + 1, index);
                            }}
                          ></AiOutlineStar>
                        ) : (
                          <AiFillStar
                            className="text-yellow text-[35px] text-darkGrey"
                            onClick={() => {
                              handleVote(i + 1, index);
                            }}
                          ></AiFillStar>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-center w-full mt-[14px]">
                    <button
                      className="text-white bg-primary rounded-[8px] w-[95%] h-[40px]"
                      onClick={() => {
                        const vote = async () => {
                          const res = await ApiProduct.voteProduct({
                            id: product.pid,
                            scores: point[index].point,
                          });
                          if (res.status === 0) {
                            Swal.fire(
                              "Thành công",
                              "Đánh giá sản phẩm thành công",
                              "success"
                            );
                          }
                          console.log(res);
                        };
                        vote();
                      }}
                    >
                      Gửi đánh giá
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(VoteProductPopup);
