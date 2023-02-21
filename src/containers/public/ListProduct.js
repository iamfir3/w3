import AppBar from "../../components/AppBar";
import icons from "../../ultils/icons";
import { FilterProductsMobile } from "../../components/Modal";
import { filters, filtersSider } from "../../ultils/constant";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { Slider as SliderImage } from "../../components";
import { Slider } from "@mui/material";
import ProductItem from "../../components/ProductItem";
import { SelectCustomWidth } from "../../components/InputCtWidth";
import { LoadingPageDesktop } from "../../components/LoadingPage";
import Pagination from "@mui/material/Pagination";
import BreadCrumb from "../../components/BreadCrumb";
import { numFormatter } from "../../ultils/fn";
import Header from "../../components/Header";
const { FaSortAmountDownAlt, AiOutlinePlus, GrSubtract,FaMoneyBillWave,MdOutlineArrowBackIosNew } = icons;


function ListProducts({ categoryData, otherData }) {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [selectedFilterSider, setSelectedFilterSider] = useState([]);
  const [selectedRadio,setSelectedRadio] = useState();
  const [isShow, setIsShow] = useState(false);
  const { loading } = useSelector((state) => {
    return state.app;
  });
  const { products, count } = useSelector((state) => {
    return state.products;
  });

  const [isShowFilter, setIsShowFilter] = useState(false);
  const minDistance = 100000;

  // luu page hien tai
  const [page, setPage] = useState(1);
  // onChange page
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const [value2, setValue2] = useState([300000,900000]);
  const [value, setValue] = useState([300000,900000]);
  const handleChange2 = (event, newValue, activeThumb) => {
    setValue2(newValue);
  };
  const handleChange = (event, newValue, activeThumb) => {
    setSelectedRadio();
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 1500000 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };
  function numFormatter(num) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(num); // if value < 1000, nothing to do
  }
  useEffect(() => {
    setPage(1);
  }, [selectedFilter, categoryData, value2, selectedFilterSider]);
  useEffect(() => {
    const filter = Object.values(selectedFilter.sort);
    dispatch(
      actions.getProducts({
        categoryCode: categoryData.code,
        inStocking: true,
        price: value2,
        limitProduct: 12,
        order: [...filter],
        page: page,
      })
    );
  }, [selectedFilter, categoryData, value2, selectedRadio, page]);

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <div className="fixed top-0 left-0 z-10 w-full">
          <Header>
            <div className="flex justify-between w-[100%]">
              <div className="flex items-center">
                <MdOutlineArrowBackIosNew size="24" className="text-primary" />
                <span className="font-semibold text-[20px] text-primary pl-[20px]">
                  {categoryData.valueVi}
                </span>
              </div>
              <p
                className="text-primary mr-[20px] flex items-center text-[16px]"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShow(true);
                }}
              >
                Lọc
              </p>
            </div>
          </Header>
        </div>
        <div className="h-[56px] bg-white"></div>
        <div className="w-full flex flex-wrap  my-[20px]">
          {loading === true ? (
            <LoadingPageDesktop />
          ) : (
            products?.map((product) => (
              <div className="w-1/2 flex justify-center" key={product.id}>
                <ProductItem
                  votedCounter={product.votedCounter}
                  soldCounter={product.soldCounter}
                  key={product.id}
                  productId={product.id}
                  image={product?.mainImage}
                  title={product?.name}
                  description={product?.description}
                  cost={product?.costPerUnit}
                />
              </div>
            ))
          )}
          <div className="flex justify-center w-full">
            {/* component Pagination ,count là số trang thì lấy tổng chia ra */}
            <Pagination
              count={Math.ceil(count / 12)}
              color="primary"
              size="large"
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
        {isShow && (
          <FilterProductsMobile
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setIsShow={setIsShow}
            handleChange2={handleChange2}
            handleChange={handleChange}
            numFormatter={numFormatter}
            value={value}
          />
        )}
      </div>
      {/* Desktop */}
      <div className="md:block hidden w-full ">
        <div className=" flex flex-col gap-8 ">
          <SliderImage />
          <div className="ml-[16px] hidden md:block">
            <BreadCrumb
              parent={[{ name: "Trang chủ", link: "/" }]}
              current={`${
                categoryData !== "" ? categoryData.valueVi : otherData
              }`}
            ></BreadCrumb>
          </div>
          <div className=" bg-white w-full lg:block lg:px-[16px] md:px-[24px]">
            <h2 className=" lg:text-[34px] text-primary font-semibold md:text-[28px]">
              {categoryData.valueVi}
            </h2>
            <div className="flex py-2">
              <div className="w-[20%] p-2 hidden lg:block">
                <div>
                  <div
                    className="border-b-2 p-3 justify-between flex hover:bg-slate-200 items-center"
                    onClick={() => setIsShowFilter(!isShowFilter)}
                  >
                    <div className="select-none font-semibold flex items-center justify-evenly w-full">
                      <span className="w-3/4">Khoảng giá</span>
                      
                      <div className="text-xl">
                        <FaMoneyBillWave />
                      </div>
                    </div>
                    {!isShowFilter ? <AiOutlinePlus /> : <GrSubtract />}
                  </div>
                  {isShowFilter && (
                    <div className="p-3 bg-slate-200 animate-[showFilter 3s linear]">
                      {filtersSider.map((filter, idx) => {
                        return (
                          <div
                            key={JSON.stringify(filter)}
                            className=" flex justify-center items-center min-h-[50px] hover:bg-slate-300"
                          >
                            <input
                              type="radio"
                              id={`range-${idx}`}
                              value={JSON.stringify(filter)}
                              className="w-1/5"
                              checked={
                                selectedRadio?.valueVi === filter.valueVi||JSON.stringify(filter.price)===JSON.stringify(value2)
                                  ? 1
                                  : 0
                              }
                              onClick={(e) => {
                                const data = JSON.parse(e.target.value);
                                setValue(data.price);
                                setValue2(data.price);
                                setSelectedRadio(JSON.parse(e.target.value));
                              }}
                            />
                            <label
                              htmlFor={`range-${idx}`}
                              className="select-none w-4/5 text-center text-sm"
                            >
                              {filter.valueVi}
                            </label>
                          </div>
                        );
                      })}
                      <div className="mt-[50px]">
                        <Slider
                          getAriaLabel={() => "Minimum distance shift"}
                          value={value}
                          onChange={handleChange}
                          onChangeCommitted={handleChange2}
                          valueLabelDisplay="on"
                          step={100000}
                          marks
                          disableSwap
                          max={1500000}
                          valueLabelFormat={(value) => (
                            <div>{numFormatter(value)}</div>
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-auto flex flex-wrap justify-evenly lg:w-[80%]">
                <div className="min-h-[56px] w-full bg-slate-200 flex justify-between p-3">
                  <div className="w-[20%]"></div>
                  <div className="w-[30%]">
                    <SelectCustomWidth
                      label="Loc"
                      widthP="full"
                      options={filters}
                      selectValue={selectedFilter}
                      setSelectValue={setSelectedFilter}
                    />
                  </div>
                </div>

                <div className=" w-full  p-5 relative">
                  <div className="flex flex-wrap flex-auto min-h-[500px]">
                    {loading === true ? (
                      <LoadingPageDesktop />
                    ) : (
                      products.map((item, idx) => (
                        <div
                          className="w-1/3 flex justify-center "
                          key={item.id}
                        >
                          <ProductItem
                            key={item.id}
                            image={item?.mainImage}
                            title={item?.name}
                            description={item?.description}
                            cost={item?.costPerUnit}
                            productId={item?.id}
                            soldCounter={item?.soldCounter}
                            votedCounter={item?.votedCounter}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex justify-center w-full">
                    <Pagination
                      count={Math.ceil(count / 12)}
                      color="primary"
                      size="large"
                      page={page}
                      onChange={handleChangePage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListProducts;
