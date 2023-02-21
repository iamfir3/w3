import React, { useState, useEffect, useRef } from "react";
import { menuStatus } from "../../ultils/menu";
import { apiGetBills } from "../../apis/bill2";
import { OrderItem, DetailOrder } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import Header from "../../components/Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MenuItem } from "@mui/material";
const Orders = () => {
  const [status, setStatus] = useState("pending");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { fetchCartQuantity, productsCart } = useSelector((state) => {
    return state.cart;
  });

  const [cartQuantity, setCartQuantity] = useState(productsCart?.length);

  const [bills, setBills] = useState([]);
  const [billLength, setBillLength] = useState(0);
  const [allBills, setAllBills] = useState();
  const tempRef = useRef([]);
  const dispatch = useDispatch();
  const { detailOrder } = useSelector((state) => state.app);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    tempRef.current = tempRef.current.slice(0, menuStatus.length);
  }, [menuStatus]);

  //   const handleATC = async (id, variantTypes) => {
  //     try {
  //       let data = {
  //         pid: id,
  //         variant: variantTypes,
  //       };
  //       let res = await ApiCart.create(data);
  //       if (res.status === 0) {
  //         setVariantTypes(new Array(product?.variants.length).fill(null));
  //         setCanAtc(false);
  //         setActiveNotiStatus("success");
  //         setShowPopupCart(false);
  //         setAddToCartSuccess(true);
  //         dispatch(actions.fetchCartQuantity("success"));
  //       } else if (res.status === 1) {
  //         setActiveNotiStatus("warning");
  //         setShowPopupCart(false);
  //         setAddToCartSuccess(true);
  //         dispatch(actions.fetchCartQuantity("warning"));
  //       }
  //     } catch (error) {
  //       setActiveNotiStatus("error");
  //     }
  //   };
  useEffect(() => {
    const fetchBills = async () => {
      const res2 = await apiGetBills({ status: status });
      setAllBills(res2.billData);
      const response = await apiGetBills({
        limit: 5,
        page: currentPage,
        status: status,
      });

      if (response.status === 0) {
        setBills(response.billData?.rows);
        setBillLength(response.billData.count);
      }
    };
    fetchBills();

    return () => {
      dispatch(actions.detailOrder(null));
    };
  }, [status, currentPage]);

  return (
    <div className="w-full relative md:pr-[210px] lg:pr-[0px]">
      {detailOrder && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-white z-50 animate-slide-left">
          <DetailOrder />
        </div>
      )}
      <div className="translate-x-[-16px] text-primary md:hidden">
        <Header>
          <div className="flex justify-between w-[100%]">
            <div className="flex items-center">
              <MdOutlineArrowBackIosNew size="24" />
              <span className="font-semibold text-[20px] text-primary pl-[20px]">
                Đơn hàng của tôi
              </span>
            </div>
            <Link to="/cart" className="relative" onClick={(e)=>{e.stopPropagation()}}>
              <AiOutlineShoppingCart size={26} />
              <span
                className={`absolute top-[-3px] right-[-3px] w-[15px] h-[15px] bg-orange-600 rounded-full text-white text-[8px] flex items-center justify-center `}
              >
                {isLoggedIn ? cartQuantity : "0"}
              </span>
            </Link>
          </div>
        </Header>
      </div>
      <div className="lg:h-[68px] md:h-[44px] md:px-2 h-[36px]  bg-[#f1f1f1] overflow-x-auto rounded-[12px] flex items-center gap-3 lg:px-4 px-[4px]">
        {menuStatus.map((item, i) => (
          <div
            key={item.keyname}
            ref={(el) => (tempRef.current[i] = el)}
            onClick={() => {
              setStatus(item.keyname);
              tempRef.current[i].scrollIntoView({ behavior: "smooth" });
            }}
            className={`min-w-[110px] md:min-w-[140px] lg:min-w-[180px] flex justify-center cursor-pointer rounded-[8px] ${
              item.keyname === status ? "bg-[#1B4B66]  text-white" : ""
            }`}
          >
            <p className=" py-[4px] lg:text-[16px] md:text-[14px] lg:py-[8px] text-[12px] font-medium">
              {item.text}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full mt-8 ">
        <div className="flex items-center py-2 border-b border-gray-200 md:text-[14px] lg:text-[16px] px-6 hidden md:flex">
          <span className="flex-1 flex justify-center items-center">
            ID hóa đơn
          </span>
          <span className="flex-1 flex justify-center items-center">
            Ngày tạo
          </span>
          <span className="flex-1 flex justify-center items-center">
            Tổng tiền
          </span>
          <span className="flex-1 flex justify-center items-center">
            Trạng thái
          </span>
        </div>
        <div className="md:hidden">
          <p className="font-semibold text-darkGrey text-[14px] mb-[16px]">
            {billLength} đơn hàng
          </p>
        </div>
        <div className="flex flex-col md:py-6 gap-[17px] min-h-[450px]">
          {bills?.map((item) => {
            console.log(item.createdAt);
            return (
              <Link
                to={`/don-hang/${item.id}`}
                onClick={() => dispatch(actions.detailOrder(item))}
                className="w-full"
                key={item.id}
              >
                <OrderItem
                  oid={item.id}
                  createAt={item.createdAt}
                  total={item.totalCost}
                  status={item.status}
                />
              </Link>
            );
          })}
        </div>
        <div className="flex justify-end mt-[16px] pb-[16px]">
          <Pagination
            count={Math.ceil(allBills?.count / 5)}
            color="primary"
            size="large"
            page={currentPage}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
