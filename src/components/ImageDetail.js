import { IoIosArrowForward } from "react-icons/io";
import React,{ useState, useEffect } from "react";
const ImageDetail = ({
  mainImage,
  image1,
  image2,
  image3,
  type,
}) => {
  const activeImage = "border-[3px] border-primary";

  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [imageList, setImageList] = useState(0);
  useEffect(() => {
    if(imageList === 0){
      setSelectedImage(mainImage);
    }else{
      switch(imageList){
        case 1:
          setSelectedImage(image1)
          break;
        case 2:
          setSelectedImage(image2)
          break;
        default:
          setSelectedImage(image3)
      }
    }
  }, [mainImage,imageList]);
  if (type === "mobile") {
    return (
      <div className="flex overflow-x-auto h-[340px] md:hidden">
        <img
          src={mainImage}
          className="object-cover mr-[8px] rounded-[10px] w-[332px]"
          alt="mainImage"
        />
        <img
          src={image1}
          className="object-cover mr-[8px] rounded-[10px] w-[332px]"
          alt="image1"
        />
        <img
          src={image2}
          className="object-cover mr-[8px] rounded-[10px] w-[332px]"
          alt="image2"
        />
        <img
          src={image3}
          className="object-cover mr-[8px] rounded-[10px] w-[332px]"
          alt="image3"
        />
      </div>
    );
  } else {
    return (
      <div className="md:h-[400px] lg:h-[704px] hidden md:block">
        <div className="h-[390px] w-[390px] lg:h-[605px] lg:w-[605px]">
          <img
            src={`${selectedImage}`}
            className="w-full h-full object-cover rounded-[16px]"
            alt="selectedImage"
          />
        </div>
        <div className="flex justify-center mt-[24px] items-center select-none">
          <IoIosArrowForward
            className="rotate-[180deg] cursor-pointer"
            size="25px"
            onClick={() => {
              setImageList((prev) => {
                if (prev > 0 && prev <= 3) return prev - 1;
                else if (prev === 0) return 3;
              });
            }}
          ></IoIosArrowForward>
          <img
            src={mainImage}
            className={`object-cover cursor-pointer mx-[15px] rounded-[10px] w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] transition-all ${
              imageList === 0 ? activeImage : ""
            }`}
            alt="mainImage"
            onClick={() => {
              setImageList(0);
            }}
          />
          <img
            src={image1}
            className={`object-cover cursor-pointer mx-[15px] rounded-[10px] w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] transition-all ${
              imageList === 1 ? activeImage : ""
            }`}
            alt="image1"
            onClick={() => {
              setImageList(1);
            }}
          />
          <img
            src={image2}
            className={`object-cover cursor-pointer mx-[15px] rounded-[10px] w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] transition-all ${
              imageList === 2 ? activeImage : ""
            }`}
            alt="image2"
            onClick={() => {
              setImageList(2);
            }}
          />
          <img
            src={image3}
            className={`object-cover cursor-pointer mx-[15px] rounded-[10px] w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] transition-all ${
              imageList === 3 ? activeImage : ""
            }`}
            alt="image3"
            onClick={() => {
              setImageList(3);
            }}
          />
          <IoIosArrowForward
            size="25px"
            className="cursor-pointer"
            onClick={() => {
              setImageList((prev) => {
                if (prev >= 0 && prev <3) return prev + 1
                else if (prev === 3) return 0
              });
            }}
          ></IoIosArrowForward>
        </div>
      </div>
    );
  }
};

export default React.memo(ImageDetail);