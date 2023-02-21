import wishlistApi from "../../apis/wishlist";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonFooterContainer from "../../components/ButtonFooterContainer";
import LongButton from "../../components/LongButton";
import Header from "../../components/Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import noWishlist from "../../assets/NoWishlist.png";
import ProductItem from "../../components/ProductItem";

const WishList = () => {
  const [wishlist, setWishlist] = useState();
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await wishlistApi.getAllWish();
        if (res.status === 0) {
          setWishlist(res.wishlist);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchWishlist();
  }, []);
  return (
    <>
      <>
        <div>
          <div className="md:hidden">
            <Header>
              <div className="flex text-[14px] text-primary items-center font-[600] gap-[20px]">
                <MdOutlineArrowBackIosNew size="24" />
                <div className="text-[20px]">Yêu thích</div>
              </div>
            </Header>
          </div>

          {!wishlist && (
            <div className="flex flex-col items-center justify-center px-[35px] mt-[80px]">
              <img src={noWishlist} />
              <p className="text-black text-[28px] font-[700] mt-[30px] mb-[16px]">
                Hmmm...
              </p>
              <p className="text-center text-black font-[500] text-[14px]">
                Có vẻ như bạn chưa thêm sản phẩm nào danh sách yêu thích
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-[22px] md:gap-[16px] px-[16px] justify-center md:px-0 md:justify-start">
            {wishlist?.map((item) => (
              <div className="md:w-[31%] lg:w-[32%] md:flex md:justify-start">
                <ProductItem
                  votedCounter={item.productData.votedCounter}
                  soldCounter={item.productData.soldCounter}
                  key={item.productData.id}
                  productId={item.productData.id}
                  image={item.productData?.mainImage}
                  title={item.productData?.name}
                  description={item.productData?.description}
                  cost={item.productData?.costPerUnit}
                />
              </div>
            ))}
          </div>
          {!wishlist && (
            <div className="md:hidden w-full h-full">
              <ButtonFooterContainer>
                <Link to="/" className="w-[95%]">
                  <LongButton
                    width="100%"
                    height="44px"
                    backgroundColor="#1B4B66"
                    color="white"
                  >
                    <p>Trở về trang chủ</p>
                  </LongButton>
                </Link>
              </ButtonFooterContainer>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default WishList;
