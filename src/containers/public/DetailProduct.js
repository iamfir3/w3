import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ApiComment from "../../apis/comment";
import ApiProduct from "../../apis/product";
import wishlistApi from "../../apis/wishlist";
import ApiCart from "../../apis/cart";
import ButtonFooterContainer from "../../components/ButtonFooterContainer";
import CreateComponentPopup from "../../components/CreateCommentPopup";
import DetailNavDesktop from "../../components/DetailNavDesktop";
import Dropdown from "../../components/Dropdown";
import Header from "../../components/Header";
import ImageDetail from "../../components/ImageDetail";
import LongButton from "../../components/LongButton";
import NameAndDescription from "../../components/NameAndDescription";
import RelatedProduct from "../../components/RelatedProduct";
import {
  ReviewAndRatingDesktop,
  ReviewAndRatingMobile,
} from "../../components/ReviewAndRating";
import SideNavigateMenu from "../../components/SideNavigateMenu";
import Voucher from "../../components/Voucher";
import SelectvariantPopup from "../../triggercompoents/SelectVariantPopup";
import icons from "../../ultils/icons";
import { PriceCaculator } from "../../ultils/caculator";
import { NotiStatus } from "../../components/UploadStatus";
import { AiOutlineShoppingCart } from "react-icons/ai";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import { generatePath } from "../../ultils/fn";
import { AiFillHeart } from "react-icons/ai";

const { AiFillStar, AiOutlineHeart, MdOutlineArrowBackIosNew, RiHandbagLine } =
  icons;

function createMarkup(des) {
  return { __html: des };
}

const DetailProduct = () => {
  const { fetchCartQuantity, productsCart } = useSelector((state) => {
    return state.cart;
  });

  const [cartQuantity, setCartQuantity] = useState(productsCart?.length);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const id = useParams()["id"];
  const ratingAndReviewRef = useRef();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState({});
  const [activeTab, setActiveTab] = useState([1, 0, 0]);
  const [Vouchers, setVouchers] = useState([]);
  const [showPopupReview, setShowPopupReview] = useState(false);
  const [showPopupComment, setShowPopupComment] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showPopupCart, setShowPopupCart] = useState(false);
  const [variantTypes, setVariantTypes] = useState([]);
  const [canAtc, setCanAtc] = useState(false);
  const [activeNotiStatus, setActiveNotiStatus] = useState(false);
  const [onFetchCartQuantity, setOnFetchCartQuantity] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState({
    status: false,
    wid: null,
  });
  const handlerFetchWishlist = async () => {
    try {
      const res = await wishlistApi.getAllWish();
      if (res.status === 0) {
        if (JSON.stringify(wishlist) !== JSON.stringify(res.wishlist)) {
          setWishlist(res.wishlist);
        }
      }
    } catch (err) { }
  };
  useEffect(() => {
    const fetchCartQuantity = async () => {
      const res = await ApiCart.get();
      setCartQuantity(res.yourCart.length);
    };
    fetchCartQuantity();
  }, [fetchCartQuantity, cartQuantity, productsCart, onFetchCartQuantity]);

  const fetchComments = async () => {
    const res = await ApiComment.getComment({
      productId: id,
      limitComment: 5,
      page: currentPage,
    });
    setComments(() => {
      return res.commentData;
    });
  };

  useEffect(() => {
    fetchComments();
  }, [currentPage]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await ApiProduct.getProductByIdClient({ id: id });
      let product = res.productData.rows[0];
      setProduct(product);
      setVariantTypes(new Array(product?.variants.length).fill(null));
    };
    fetchProduct();
    window.scrollTo(0, 0)
  }, [id]);
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        if (product?.categoryData) {
          const res = await ApiProduct.getAll({
            categoryCode: product?.categoryData.code,
            limitProduct: 10,
          });
          setRelatedProducts(res?.productData.rows);
        }
      } catch (e) { }
    };

    fetchRelatedProducts();
  }, [product]);

  const handleRenderStar = (starValue) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= +starValue) {
        stars = [...stars, <AiFillStar size="23" className="text-yellow" />];
      } else {
        stars = [
          ...stars,
          <AiFillStar size="23" className="text-darkGrey-tint" />,
        ];
      }
    }
    return stars;
  };

  useEffect(() => {
    handlerFetchWishlist();
    console.log(isInWishlist);
    if (wishlist !== 1) {
      wishlist?.forEach((productWishlist, i) => {
        console.log(productWishlist, product);
        if (productWishlist?.productData.id === product?.id) {
          setIsInWishlist({ status: true, wid: productWishlist?.id });
        }
      });
    }
  }, [wishlist, product]);

  const hanlePickVariants = (variant, value, price, index) => {
    setVariantTypes((prev) => {
      for (let i = 0; i < prev.length; i++) {
        if (i === index) {
          let data = {
            variant: variant,
            value: value,
            price: price,
          };
          prev[i] = data;
        }
      }
      return [...prev];
    });
  };
  useEffect(() => {
    !variantTypes.includes(null) ? setCanAtc(true) : setCanAtc(false);
  }, [variantTypes]);

  const handleATC = async (id, variantTypes) => {
    try {
      let data = {
        pid: id,
        variant: variantTypes,
      };
      setOnFetchCartQuantity(true);
      let res = await ApiCart.create(data);
      if (res.status === 0) {
        setVariantTypes(new Array(product?.variants.length).fill(null));
        setCanAtc(false);
        setActiveNotiStatus("success");
        setShowPopupCart(false);

        dispatch(actions.fetchCartQuantity("success"));
        setOnFetchCartQuantity(false);
      } else if (res.status === 1) {
        setActiveNotiStatus("warning");
        setShowPopupCart(false);

        setOnFetchCartQuantity(false);
        dispatch(actions.fetchCartQuantity("warning"));
      }
    } catch (error) {
      setActiveNotiStatus("error");
      setOnFetchCartQuantity(false);
    }
  };
  const handleWishlist = async () => {
    if (!isInWishlist.status) {
      try {
        const res = await wishlistApi.createWishlist({ pids: [product.id] });
        if (res.status === 0) {
          handlerFetchWishlist();
          wishlist.forEach((productWishlist, i) => {
            if (productWishlist.productData.id === product.id) {
              setIsInWishlist({ status: true, wid: productWishlist.id });
            }
          });
        }
      } catch (err) { }
    } else {
      try {
        const res = await wishlistApi.delete({ wids: [isInWishlist.wid] });
        if (res.status === 0) {
          setIsInWishlist({ status: false, wid: null });
        }
      } catch (err) { }
    }
  };
  return (
    <>
      {<NotiStatus active={activeNotiStatus} setActive={setActiveNotiStatus} />}
      {product && (
        <div className=" bg-lightGrey md:bg-white relative lg:bg-white lg:mt-[24px]">
          <SelectvariantPopup
            setShowPopupCart={setShowPopupCart}
            showPopupCart={showPopupCart}
            product={product}
            setShowPopupReview={setShowPopupReview}
            comments={comments}
            handleATC={handleATC}
            activeNotiStatus={activeNotiStatus}
            setActiveNotiStatus={setActiveNotiStatus}
          />

          {showHeader && (
            <div className="md:hidden">
              <Header>
                <div className="flex justify-between w-[93%]">
                  <MdOutlineArrowBackIosNew size="24" />
                  {/* <span
                    className={`relative ${
                      addToCartSuccess ? "animate-bounce2" : ""
                    }`}
                    onAnimationEnd={() => {
                      setAddToCartSuccess(false);
                    }}
                    style={{ "animation-iteration-count": "5" }}
                  >
                    <AiOutlineShoppingCart size={26} />
                    <span className="absolute top-0 right-0 w-[10px] h-[10px] bg-orange-600 rounded-full"></span>
                  </span> */}
                  <Link to="/cart" className="relative">
                    <AiOutlineShoppingCart
                      size={26}
                      className={`${activeNotiStatus === "success" ||
                          activeNotiStatus === "warning"
                          ? "animate-bounce2"
                          : ""
                        }`}
                      style={{ animationIterationCount: "5" }}
                      onClick={(e) => { e.stopPropagation() }}
                    />
                    <span
                      className={`absolute top-[-3px] right-[-3px] w-[15px] h-[15px] bg-orange-600 rounded-full text-white text-[8px] flex items-center justify-center ${activeNotiStatus === "success" ||
                          activeNotiStatus === "warning"
                          ? "animate-bounce2"
                          : ""
                        }`}
                      style={{ animationIterationCount: "5" }}
                    >
                      {isLoggedIn ? cartQuantity : "0"}
                    </span>
                  </Link>
                </div>
              </Header>
            </div>
          )}

          <ReviewAndRatingMobile
            commentData={comments}
            name={product.name}
            shortDescription={product?.shortDescription}
            score={product?.scores}
            setShowPopupReview={setShowPopupReview}
            showPopupReview={showPopupReview}
            setShowPopupComment={setShowPopupComment}
            setShowHeader={setShowHeader}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <CreateComponentPopup
            setShowPopupComment={setShowPopupComment}
            showPopupComment={showPopupComment}
            id={product.id}
            fetchComments={fetchComments}
          />

          <div className="bg-[white] pl-[16px] ">
            <div className="mb-[16px] hidden md:block">
              <BreadCrumb
                parent={[
                  { name: "Trang chủ", link: "/" },
                  {
                    name: product?.categoryData?.valueVi,
                    link: `/${generatePath(product?.categoryData?.valueVi)}`,
                  },
                ]}
                current={product?.name}
              ></BreadCrumb>
            </div>
            <div className="md:flex w-full">
              <section className="">
                <div className="relative">
                  {/* image mobile */}
                  <ImageDetail
                    mainImage={product.mainImage}
                    image1={product.image1}
                    image2={product.image2}
                    image3={product.image3}
                    type="mobile"
                  />

                  {/* image desktop */}
                  <ImageDetail
                    mainImage={product.mainImage}
                    image1={product.image1}
                    image2={product.image2}
                    image3={product.image3}
                    type="desktop"
                  />
                </div>
              </section>

              <div className="md:ml-[20px] flex-1 pr-[16px]">
                <NameAndDescription
                  name={product.name}
                  shortDescription={product?.shortDescription}
                />

                <section className="hidden md:flex mt-[28px] mb-[30px]">
                  {handleRenderStar(product?.scores)?.map((content, i) => (
                    <span key={i}>{content}</span>
                  ))}
                  <p className="text-darkGrey-tint text-[16px] ">
                    ({product.votedCounter} Đánh giá)
                  </p>
                </section>

                <section className="flex items-center">
                  <p className="font-semibold text-[20px] text-[#171520] mr-[10px] md:text-[30px] lg:text-[40px] md:font-semibold">
                    <span>đ</span>
                    {!canAtc &&
                      Number(product.costPerUnit?.toFixed(1))?.toLocaleString()}
                    {canAtc &&
                      Number(
                        PriceCaculator(product, variantTypes).toFixed(1)
                      )?.toLocaleString()}
                  </p>
                  <div className="text-[#626262] relative mr-[8px] md:translate-y-[5px]">
                    <span className=" font-medium text-[14px] leading-5 lg:text-[34px] md:text-[24px] md:font-semibold md:text-[#B6B6B6]">
                      <span>đ</span>
                      {Number(
                        product.costPerUnit?.toFixed(1)
                      )?.toLocaleString()}
                    </span>
                    <div className="absolute w-full h-[1px] top-[50%] left-0 bg-[#626262] md:top-[35%]"></div>
                  </div>
                  {/* <p className="text-[#E21D1D] leading-5 text-[14px] font-medium tracking-tighter lg:text-[20px] md:text-[16px] md:font-semibold md:text-[#FF404B]">
                  {!canAtc &&
                      ""}
                    {canAtc &&  Number( PriceCaculator(product,variantTypes).toFixed(1))?.toLocaleString()}
                  </p> */}
                </section>
                <section className="pb-[16px] hidden md:block mt-[20px] w-[full]">
                  <Voucher Vouchers={Vouchers}></Voucher>
                </section>

                <div className="hidden md:block mb-[16px]">
                  <div
                    className={`text-[#e21d1d] ${canAtc ? "invisible" : "visible"
                      }`}
                  >
                    Vui lòng chọn loại hàng để thêm vào giỏ
                  </div>
                  {product?.variants?.map((variant, index) => {
                    return (
                      <div key={variant.id} className="select-none">
                        <p className="text-[18px] font-semibold text-black">
                          {variant?.name}
                        </p>
                        <div className="flex mt-[10px] gap-[9px] font-bold text-black text-base">
                          {variant?.value.map((value, i) => (
                            <div
                              onClick={() =>
                                hanlePickVariants(
                                  variant?.name,
                                  value?.type,
                                  value?.price,
                                  index
                                )
                              }
                              key={value.id}
                              className={`p-[8px] cursor-pointer border-[3px] rounded-[8px] ${variantTypes[index]?.value === value?.type
                                  ? "border-[#1b4b66]"
                                  : ""
                                }`}
                            >
                              {value.type}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <section className="hidden md:flex">
                  {/* md:w-[210px] lg:w-[328px] */}
                  <div className="w-full md:text-[12px] lg:text-[14px]">
                    <LongButton
                      width="100%"
                      height="44px"
                      backgroundColor="#1B4B66"
                      size="14px"
                      color="white"
                      disabled={!canAtc}
                      handleClick={() => {
                        handleATC(product?.id, variantTypes);
                        dispatch(actions.fetchCartQuantity(true));
                      }}
                    >
                      <RiHandbagLine
                        size=""
                        className="lg:text-[24px] md:text-[20px]"
                      ></RiHandbagLine>
                      <p>Thêm vào giỏ</p>
                    </LongButton>
                  </div>

                  {/* md:w-[153px] lg:w-[240px] */}
                  <div
                    className="border-[2px] border-primary rounded-[8px] md:ml-[14px] md:text-[12px] lg:text-[14px] lg:ml-[24px] w-[80%]"
                    onClick={() => {
                      handleWishlist();
                    }}
                  >
                    <LongButton
                      width="100%"
                      height="40px"
                      backgroundColor="white"
                      size="100%"
                      color="#1B4B66"
                    >
                      {isInWishlist.status ? (
                        // &&
                        // wishlist?.wishlist.some(
                        //   (productWishlist) =>
                        //     productWishlist.productData.id === product.id
                        // )
                        <>
                          <AiFillHeart
                            size="24px"
                            className="text-primary lg:text-[24px] md:text-[20px]"
                          ></AiFillHeart>
                          <p>Sản phẩm yêu thích</p>
                        </>
                      ) : (
                        <>
                          <AiOutlineHeart
                            size="24px"
                            className="text-primary lg:text-[24px] md:text-[20px]"
                          ></AiOutlineHeart>
                          <p>Thêm vào yêu thích</p>
                        </>
                      )}
                    </LongButton>
                  </div>
                </section>
              </div>
            </div>

            <section className="flex mt-[10px] pb-[20px] md:hidden">
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
                  <span>{comments.count} bình luận</span>
                </div>
              </div>
            </section>

            <section className="pb-[16px] md:hidden">
              <Voucher Vouchers={Vouchers}></Voucher>
            </section>
          </div>

          <section className="mt-[8px] bg-white md:hidden">
            <Dropdown title="Mô tả sản phẩm" opened={true}>
              <p className="font-medium text-[14px] leading-5 text-[#626262] px-[16px] w-full pb-[20px]">
                <div
                  dangerouslySetInnerHTML={createMarkup(product.description)}
                ></div>
              </p>
            </Dropdown>
          </section>

          <section
            className="mt-[8px] bg-white md:hidden"
            onClick={() => {
              setShowPopupReview(true);
              setShowHeader(false);
            }}
          >
            <SideNavigateMenu title="Đánh giá và bình luận"></SideNavigateMenu>
          </section>

          <DetailNavDesktop
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            ratingAndReviewRef={ratingAndReviewRef}
          />

          <section className="hidden md:block ml-[20px] mr-[20px] mt-[24px] md:mb-[0px] min-h-[300px]">
            <div className={`${activeTab[0] === 1 ? "block" : "hidden"}`}>
              <p className="text-darkGrey text-[16px] font-medium">
                {/* {product.description} */}
                <div
                  dangerouslySetInnerHTML={createMarkup(product.description)}
                ></div>
              </p>
            </div>
            <div className={`${activeTab[1] === 1 ? "block" : "hidden"}`}>
              <RelatedProduct
                products={relatedProducts}
                cate={product.categoryData.valueVi}
              />
            </div>
            <div className={`${activeTab[2] === 1 ? "block" : "hidden"}`}>
              <ReviewAndRatingDesktop
                fetchComments={fetchComments}
                commentData={comments}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                id={product.id}
              />
            </div>
          </section>

          <section className="md:hidden bg-white mt-[8px] px-[16px] pt-[8px]">
            <RelatedProduct
              products={relatedProducts}
              cate={product.categoryData.valueVi}
            />
          </section>

          <div className="h-[66px] md:hidden"></div>

          <div className="md:hidden">
            <ButtonFooterContainer>
              <button
                onClick={() => {
                  handleWishlist();
                }}
                className="w-[44px] h-[44px] bg-[#F4F4F4] rounded-[8px] flex items-center justify-center text-primary"
              >
                {isInWishlist.status ? (
                  <AiFillHeart
                    size="24px"
                    className="text-primary"
                  ></AiFillHeart>
                ) : (
                  <AiOutlineHeart
                    size="24px"
                    className="text-primary"
                  ></AiOutlineHeart>
                )}
              </button>

              <div
                className="h-[44px] w-[272px]"
                onClick={() => {
                  setShowPopupCart(true);
                }}
              >
                <LongButton
                  width="100%"
                  height="100%"
                  color="white"
                  backgroundColor="#1B4B66"
                  size="14px"
                  disabled={false}
                >
                  <RiHandbagLine size="24px"></RiHandbagLine>
                  <p>Chọn loại hàng</p>
                </LongButton>
              </div>
            </ButtonFooterContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProduct;
