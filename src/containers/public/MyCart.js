import AppBar from "../../components/AppBar";
import { Button2 } from "../../components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem";
import CartItemMobile from "../../components/CartItemMobile";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { TotalPriceCaculator } from "../../ultils/caculator";
import AlertPopup from "../../triggercompoents/AlertPopup";
import { numFormatter } from "../../ultils/fn";
import Voucher from "../../components/Voucher";
import { NotiStatus, NotiStatusMobile } from "../../components/UploadStatus";
import ApiCheckout from "../../apis/bill2";
import BreadCrumb from "../../components/BreadCrumb";

function MyCart() {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const [quanityList, setQuanityList] = useState([]);
  const [openAlertPopup, setOpenAlertPopup] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [reload, setReload] = useState(false);
  const [activeNotify, setActiveNotify] = useState(false);
  const [dataBill, setDataBill] = useState([]);

  const dispatch = useDispatch();
  const { productsCart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(actions.addToCart());
  }, [reload]);

  useEffect(() => {
    if (checkedList.length !== 0 && quanityList.length !== 0 && productsCart) {
      let tmpPrice = TotalPriceCaculator(
        productsCart,
        checkedList,
        quanityList
      );
      setTotalPrice(tmpPrice);
    } else {
      setTotalPrice(0);
    }
  }, [checkedList, quanityList]);

  const handlePlaceOrder = async () => {
    try {
      let data = {
        products: [...dataBill],
      };
      let res = await ApiCheckout.create(data);
      if (res.status === 0) window.location.href = "/check-out";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden h-screen">
        <NotiStatusMobile active={activeNotify} setActive={setActiveNotify} />
        <AppBar title="Giỏ hàng" />
        <div className="w-full flex flex-col px-2  bg-lightGrey h-[70%] overflow-auto">
          {/* product */}
          {productsCart && productsCart.length === 0 && (
            <div className="text-center mt-[24px]">
              <div className="text-darkGrey">
                Hiện chưa có sản phẩm nào được thêm vào giỏ hàng
              </div>
              <Link className="text-primary" to="/">
                Đi tới mua sắm{" "}
              </Link>
            </div>
          )}
          {productsCart?.map((product) => {
            return (
              <CartItemMobile
                product={product?.productData}
                cartID={product?.id}
                variants={product?.variant}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
                setQuanityList={setQuanityList}
                quanityList={quanityList}
                setOpenAlertPopup={setOpenAlertPopup}
                setIdDelete={setIdDelete}
                isMobile={true}
                dataBill={dataBill}
                setDataBill={setDataBill}
              />
            );
          })}
        </div>
        <div className="min-h-[200px] bg-white px-[16px] pt-[30px]">
          <p className="text-[14px] font-semibold">Thông tin hóa đơn</p>

          <div className="flex justify-between font-medium text-darkGrey text-[14px] mt-[10px]">
            <div className="w-1/2 ">
              <p>Tổng hóa đơn : </p>
              {/* <p className="font-bold text-black">Grand Total : </p> */}
            </div>
            <div className="w-1/3  text-black text-center">
              <p>{numFormatter(totalPrice)}</p>
              {/* <p className="font-extrabold">{numFormatter(100000)}</p> */}
            </div>
          </div>
          <div className="flex justify-between font-semibold text-black text-[14px] mt-[8px]">
            <div className="w-1/2 ">
              <p className="font-bold text-black">Thành tiền : </p>
            </div>
            <div className="w-1/3  text-black text-center">
              <p className="font-extrabold">{numFormatter(totalPrice)}</p>
            </div>
          </div>
        </div>
        <div className="max-[80px] bg-white flex items-center p-3 justify-between ">
          <div className="flex flex-col items-center">
            <p className="font-bold">Thanh toán : </p>
            <p>{numFormatter(totalPrice)}</p>
          </div>
          <div className="w-1/2">
            <Button2
              disable={totalPrice === 0}
              handleClick={() => handlePlaceOrder()}
              text="Tiến hành thanh toán"
            />
          </div>
        </div>
      </div>

      
      {/* Desktop */}
      <div className="md:block hidden w-full ">
        <div className="hidden md:block md:px-[16px] lg:px-[20px]">
          <BreadCrumb
            parent={[{ name: "Trang chủ", link: "/" }]}
            current="Giỏ hàng của tôi"
          ></BreadCrumb>
        </div>
        {
          <NotiStatus
            content={
              activeNotify === "success"
                ? "Sản phẩm được xóa thành công"
                : "Xóa sản phẩm không thành công"
            }
            active={activeNotify}
            setActive={setActiveNotify}
          />
        }
        <div className="py-6 mb-6 flex flex-col gap-8 ">
          {/* <SliderImage /> */}
          <div className=" w-full md:block lg:px-[20px] md:px-[16px] ">
            <h2 className=" lg:text-[24px] md:text-[20px] font-semibold text-primary lg:mb-[28px] md:mb-[20px]">
              Giỏ hàng của tôi
            </h2>
            <div className="flex justify-between">
              <div className="w-[60%] ">
                <div className="flex font-medium text-darkGrey border-b-2 text-[16px] items-center">
                  <p className="w-[50%]">Tên sản phẩm</p>
                  <p className="w-[20%] text-center">Giá</p>
                  <p className="w-[15%] text-center">Số lượng</p>
                  <p className="w-[15%] text-center">Tổng</p>
                </div>
                <div className=" overflow-auto h-[560px] scroll-smooth">
                  {/* product */}
                  {productsCart && productsCart.length === 0 && (
                    <div className="text-center mt-[24px]">
                      <div className="text-darkGrey">
                        Hiện chưa có sản phẩm nào được thêm vào giỏ hàng
                      </div>
                      <Link className="text-primary" to="/">
                        Đi tới mua sắm{" "}
                      </Link>
                    </div>
                  )}
                  {productsCart?.map((product) => {
                    return (
                      <CartItem
                        product={product?.productData}
                        cartID={product?.id}
                        variants={product?.variant}
                        checkedList={checkedList}
                        setCheckedList={setCheckedList}
                        setQuanityList={setQuanityList}
                        quanityList={quanityList}
                        setOpenAlertPopup={setOpenAlertPopup}
                        setIdDelete={setIdDelete}
                        isMobile={false}
                        dataBill={dataBill}
                        setDataBill={setDataBill}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="w-1/3">
                <p className="lg:text-[14px] md:text-[12px] font-semibold border-b-[1px]">
                  Thông tin hóa đơn
                </p>

                <div className="flex justify-between font-medium text-darkGrey mt-[33px] lg:text-[16px] md:text-[14px]">
                  <div className="w-1/2 ">
                    <p>Tổng hóa đơn : </p>
                    {/* <p className="font-bold text-black">Grand Total : </p> */}
                  </div>
                  <div className="w-1/3  text-black text-right">
                    <p>{numFormatter(totalPrice)}</p>
                    {/* <p className="font-extrabold">{numFormatter(100000)}</p> */}
                  </div>
                </div>
                <div className="flex justify-between font-semibold lg:text-[16px] md:text-[14px] mb-[24px] text-black mt-[12px]">
                  <div className="w-1/2 ">
                    <p className="font-bold text-black">Thanh toán : </p>
                  </div>
                  <div className="w-1/3  text-black text-right">
                    <p className="font-extrabold">{numFormatter(totalPrice)}</p>
                  </div>
                </div>
                <Button2
                  handleClick={() => handlePlaceOrder()}
                  text={"Tiến hành thanh toán"}
                  disable={totalPrice > 0 ? false : true}
                />
                <div className="mt-[24px] w-full">
                  <Voucher isFreeShip={totalPrice < 500000 ? false : true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertPopup
        open={openAlertPopup}
        setOpen={setOpenAlertPopup}
        idDelete={idDelete}
        setReload={setReload}
        setActiveNotify={setActiveNotify}
      />
    </>
  );
}

export default MyCart;
