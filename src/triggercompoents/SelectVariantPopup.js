import DownPopup from "../components/DownPopup";
import LongButton from "../components/LongButton";
import icons from "../ultils/icons";
import { useEffect, useState } from "react";
import { PriceCaculator } from "../ultils/caculator";
import { NotiStatusMobile } from "../components/UploadStatus";

const { AiFillStar, IoIosArrowForward, RiHandbagLine } = icons

const SelectvariantPopup = ({ 
  setShowPopupCart, 
  showPopupCart, 
  product, 
  setShowPopupReview, 
  comments, 
  handleATC,
  setActiveNotiStatus,
  activeNotiStatus }
  ) => {
  const [variantTypes, setVariantTypes] = useState(new Array(product?.variants.length).fill(null))
  const [canAtc, setCanAtc] = useState(false)

  const hanlePickVariants = (variant,value,price,index) => {
    setVariantTypes((prev) => {
      for (let i = 0; i < prev.length; i++) {
        if (i === index) {
          let data = {
            variant: variant,
            value: value,
            price: price
          }
          prev[i] = data;
        }
      }
      return [...prev];
    })
  }

  const renderPrice = () => {
    if(!product) return 'Có lỗi xảy ra'
    if(!canAtc) return 'đ ' + Number(product.costPerUnit?.toFixed(1))?.toLocaleString()
    else {
      return 'đ ' +  Number( (PriceCaculator(product,variantTypes)).toFixed(1))?.toLocaleString()
    }
  }


  useEffect(() => {
    !variantTypes.includes(null)?setCanAtc(true):setCanAtc(false)
  },[variantTypes])

  return (
  <>
  <NotiStatusMobile 
    active={activeNotiStatus}
    setActive={setActiveNotiStatus}
  />
  <DownPopup setShowPopup={setShowPopupCart} showPopup={showPopupCart}>
    <div className="flex gap-[16px]">
      <div>
        <img
          src={product?.mainImage}
          className="w-[74px] h-[74px] rounded-[8px]"
          alt="productImage"
        />
      </div>
      <div className="">
        <p className="font-semibold text-xs text-black">
          {product.name}
        </p>
        <p className="font-medium text-xs text-darkGrey mt-[2px] mb-[4px]">
          This is short description
        </p>
        <p className="font-semibold text-sm text-black">
          {renderPrice()}
        </p>
      </div>
    </div>
    <div
      className="flex my-[24px]"
      onClick={() => {
        setShowPopupCart(false);
        setShowPopupReview(true);
      }}
    >
      <div className="flex items-center w-[74px] h-[38px] bg-[#f4f4f4] rounded-[4px] justify-center mr-[14px]">
        <p className="text-[#171520] text-[16px] leading-4 font-semibold mr-[4px]">
          {product.scores}
        </p>
        <AiFillStar className="text-[#FF8C4B]" size="20px" />
      </div>
      <div>
        <p className="text-[#171520] text-[14px] font-semibold leading-5">
          Lượt đánh giá
        </p>
        <div className="text-[#626262] text-[14px] font-medium leading-5">
          <span>{product.votedCounter} Đánh giá và </span>
          <span>{comments?.count} bình luận</span>
        </div>
      </div>

      <div className="ml-auto">
        <IoIosArrowForward
          className="text-darkGrey justify-self-end"
          size="30"
        ></IoIosArrowForward>
      </div>
    </div>
    <div className={`text-[#e21d1d] ${canAtc?'invisible':'visible'}`} >Vui lòng chọn loại hàng để thêm vào giỏ</div>
    <div>
      {product?.variants.map((variant, index) => {
        return (
          <div key={index}>
            <p className="text-xm font-semibold text-black">
              {variant?.name}
            </p>
            <div className="flex mt-[10px] gap-[9px] font-bold text-black text-base">
              {variant?.value.map((value,i) => (
                <div key={i}
                  onClick={() => hanlePickVariants(variant?.name,value?.type,value?.price,index)}
                  className={`p-[8px] border-[2px] rounded-[8{px] ${variantTypes[index]?.value === value?.type? 'border-[#1b4b66]':''}`}>
                  {value.type}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
    <div className="flex justify-center mt-[30px] pb-[11px]">
      <LongButton 
      width="90%" 
      backgroundColor="#1B4B66" 
      color="white" 
      height='44px'
      disabled={!canAtc}
      handleClick={() => handleATC(product?.id,variantTypes)}>
        <RiHandbagLine />
        <p>Thêm vào giỏ</p>
      </LongButton>
    </div>
  </DownPopup>
  </>)
}

export default SelectvariantPopup