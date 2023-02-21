import { useEffect, useRef, useState } from "react";

const DetailNavDesktop = (
  {activeTab,
  setActiveTab,
  ratingAndReviewRef,}
  ) => {
  const relatedProductRef = useRef();
  const productDetailRef = useRef();
  const [initPosition, setInitPosition] = useState({ left: 0, width: 0 });

  const infoClickHandler = (ref) => {
    setInitPosition({
      left: ref.current.offsetLeft,
      width: ref.current.offsetWidth,
    });
  };
  
  useEffect(() => {
    setInitPosition((prev) => {
      return {
        ...prev,
        left: productDetailRef?.current?.offsetLeft,
        width: productDetailRef?.current?.offsetWidth,
      };
    });

  },[relatedProductRef,productDetailRef])
  return <div className="h-[48px] items-center relative bg-lightGrey mx-[20px] rounded-[12px] px-[16px] mt-[55px] hidden md:flex">
  <div
    className={`px-[18px] py-[10px] z-10 ${
      activeTab[0] === 1 ? "text-white" : "text-darkGrey"
    }`}
    ref={productDetailRef}
    onClick={() => {
      infoClickHandler(productDetailRef);
      setActiveTab([1, 0, 0]);
    }}
  >
    <p
      className="lg:text-[16px] md:text-[14px] font-medium"
      style={{ userSelect: "none" }}
    >
      Thông tin chi tiết
    </p>
  </div>
  <div
    className={`px-[18px] py-[10px] z-10 ${
      activeTab[1] === 1 ? "text-white" : "text-darkGrey"
    }`}
    ref={relatedProductRef}
    onClick={() => {
      infoClickHandler(relatedProductRef);
      setActiveTab([0, 1, 0]);
    }}
  >
    <p
      className="lg:text-[16px] md:text-[14px] font-medium"
      style={{ userSelect: "none" }}
    >
      Sản phẩm liên quan
    </p>
  </div>
  <div
    className={`px-[18px] py-[10px] z-10 ${
      activeTab[2] === 1 ? "text-white" : "text-darkGrey"
    }`}
    ref={ratingAndReviewRef}
    onClick={() => {
      infoClickHandler(ratingAndReviewRef);
      setActiveTab([0, 0, 1]);
    }}
  >
    <p
      className="lg:text-[16px] md:text-[14px] font-medium"
      style={{ userSelect: "none" }}
    >
      Đánh giá và bình luận
    </p>
  </div>

  <div
    className={`absolute bg-primary h-[32px] top-[19%] transition-all rounded-[8px] z-1`}
    style={{
      width: `${initPosition.width}px`,
      left: `${initPosition.left}px`,
    }}
  ></div>
</div>
};

export default DetailNavDesktop;
