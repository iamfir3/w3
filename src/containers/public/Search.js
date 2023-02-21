import Header from "../../components/Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import ApiProduct from "../../apis/product";
import Card from "../../components/Card";
import { LoadingPageDesktop } from "../../components/LoadingPage";
import SearchNotFound from "../../assets/SearchNotFound.png";
import ButtonFooterContainer from "../../components/ButtonFooterContainer";
import LongButton from "../../components/LongButton";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await ApiProduct.getProductByIdClient({
          name: searchKeyword,
          limitProduct: 10,
        });
        setProducts(res?.productData?.rows);
        if (res.productData.rows.length !== 0) {
          setSearchNotFound(false);
        } else {
          setSearchNotFound(true);
        }
        setIsLoading(false);
      } catch (err) {}
    };

    if (searchKeyword.length !== 0) fetchProduct();
    if (isLoading) {
      setProducts([]);
    }
  }, [searchKeyword]);
  return (
    <div className="relative">
      <Header>
        <MdOutlineArrowBackIosNew size="24" />
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex bg-lightGrey h-[40px] w-[85%] items-center p-[8px] ml-[10px] rounded-[4px]"
        >
          <input
            placeholder="Tìm kiếm"
            className="bg-lightGrey h-full outline-none w-[90%] placeholder:font-medium placeholder:text-[14px]"
            onChange={(e) => {
              setProducts([]);
              setTimeout(() => {
                setSearchKeyword(e.target.value);
              }, 800);
              setIsLoading(true);
            }}
            onFocus={(e) => {
              setIsSearching(true);
            }}
            onBlur={(e) => {
              setIsSearching(false);
            }}
          />
          <RiSearchLine size={24} />
        </div>
      </Header>
      <div className="w-full flex flex-wrap justify-evenly my-[30px] min-h-[500px]">
        {isLoading && searchKeyword.length !== 0 && <LoadingPageDesktop />}
        {searchNotFound && !isLoading && (
          <div className="h-[245px] w-[242px] flex flex-col gap-[16px]">
            <img src={SearchNotFound}></img>
            <p className="font-bold text-primary text-[28px] text-center mt-[8px]">
              Whoops!
            </p>
            <p className="font-medium text-black text-[14px] text-center">
              Rất tiếc chúng tôi không tìm thấy sản phẩm bạn đang tìm kiếm. Hãy
              thử tìm kiếm bằng từ khóa khác
            </p>
          </div>
        )}
        {products?.map((product) => (
          <Card
            key={product.id}
            name={product.name}
            image={product.mainImage}
            price={product.costPerUnit}
          />
        ))}
      </div>

      {searchNotFound && (
        <ButtonFooterContainer>
          <Link to='/' className="w-[95%]">
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
      )}
    </div>
  );
};

export default Search;
