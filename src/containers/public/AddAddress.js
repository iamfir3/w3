import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ApiAddress from "../../apis/ApiAddress";
import { Button2, LongButton } from "../../components";
import AppBar from "../../components/AppBar";
import BreadCrumb from "../../components/BreadCrumb";
import CartItemCombined from "../../components/CartItemCombined";
import { InputCustomWidth, SelectPayment } from "../../components/InputCtWidth";
import * as actions from "../../store/actions";
import AddAddressPopup from "../../triggercompoents/AddAddressPopup";
import { numFormatter } from "../../ultils/fn";
import ApiCheckout from "../../apis/bill2";
import ApiCart from "../../apis/cart";
import DownPopup from "../../components/DownPopup";
import { BsPencil } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { deleteCache } from "../../apis/bill2";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function AddAddress() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [infoUser, setInfoUser] = useState({ name: "", phone: "" });
  const [province, setProvince] = useState([]);
  const [provinceCur, setProvinceCur] = useState("DEFAULT");
  const [district, setDistrict] = useState([]);
  const [districtCur, setDistrictCur] = useState("DEFAULT");
  const [ward, setWard] = useState([]);
  const [wardCur, setWardCur] = useState("DEFAULT");
  const [detailAddress, setDetailAddress] = useState("");
  const [selected, setSelected] = useState(true);
  const [showPopupAddress, setShowPopupAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [selectAddress, setSelectAddress] = useState({ id: "", code: {} });
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceProducts, setTotalPriceProducts] = useState(0);
  const [shipFee, setShipFee] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [canCheckOut, setCanCheckOut] = useState(false);
  const [dataBill, setDataBill] = useState([]);
  const [isChoosingAddress, setIsChoosingAddress] = useState(false);
  const [cidList, setCidList] = useState([]);
  const [aid, setAid] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      const deleteCacheHanlder = async () => {
        await deleteCache();
      };
      deleteCacheHanlder();
    };
  }, []);
  //GET BILL
  useEffect(() => {
    const getBillInfo = async () => {
      const res = await ApiCheckout.get();
      if (res.status === 0) {
        const billsDetail = res?.products || [];
        billsDetail.map((billDetail) => {
          let data = {
            id: billDetail?.pid,
            cid: billDetail?.cid,
            mainImage: billDetail?.product?.mainImage,
            name: billDetail?.product?.name,
            variant: billDetail?.variant,
            price: billDetail?.cost,
            quanity: billDetail?.qty,
          };
          setCidList((prev) => [...prev, billDetail?.cid]);
          setDataBill((prve) => [...prve, data]);
        });
      }
    };
    getBillInfo();
  }, []);
  const fetchFirstAddress = async () => {
    const res = await ApiAddress.Get();
    if (res.status === 0) {
      let code = JSON.parse(res?.yourAddress[0]?.address).code;
      setAddress(res?.yourAddress);
      setSelectAddress({ id: res?.yourAddress[0]?.id, code: code });
    }
  };
  const fetchAddress = async () => {
    const res = await ApiAddress.Get();
    if (res.status === 0) {
      setAddress(res?.yourAddress);
    }
  };
  //GET ADDRESS
  useEffect(() => {
    fetchFirstAddress();
  }, [selected, showPopupAddress]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await ApiAddress.Province();
      const city = [];
      res.data.data.map((province) => city.push(province));
      setProvince(city);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      const res = await ApiAddress.District(provinceCur);
      const district = [];
      res.data.data.map((province) => district.push(province));
      setDistrict(district);
      setDistrictCur("DEFAULT");
      setWardCur("DEFAULT");
    };

    provinceCur !== "DEFAULT" && fetchDistricts();
  }, [provinceCur]);
  useEffect(() => {
    const fetchWarn = async () => {
      const res = await ApiAddress.Ward(districtCur);
      const wards = [];
      res.data.data.map((province) => wards.push(province));
      setWard(wards);
      setWardCur("DEFAULT");
    };
    districtCur !== "DEFAULT" && fetchWarn();
  }, [districtCur]);

  useEffect(() => {
    handleGetFeeShip();
  }, [selectAddress]);
  //Add new address
  const handleAddAdress = () => {
    setIsLoading(true);
    if (
      !detailAddress ||
      !provinceCur.ProvinceName ||
      !districtCur.DistrictName ||
      !wardCur.WardName ||
      !infoUser.name ||
      !infoUser.phone
    ) {
      return;
    }
    const data = {
      address: JSON.stringify({
        detail: detailAddress,
        province: provinceCur.ProvinceName,
        district: districtCur.DistrictName,
        ward: wardCur.WardName,
        code: {
          to_province_id: provinceCur.ProvinceID,
          to_district_id: districtCur.DistrictID,
          to_ward_code: wardCur.WardCode,
        },
      }),
      name: infoUser.name,
      phone: infoUser.phone,
    };
    const add = async (data) => {
      try {
        const res = await ApiAddress.Add(data);
        if (res.status === 0) {
          setStatus(true);
          setShowPopup(true);
          setSelected(true);
          setShowPopupAddress(false);
          Swal.fire("Thành công", "Đã thêm địa chỉ thành công", "success");
        }
      } catch (err) {
        setShowPopupAddress(false);
        if (err.err === 1) {
          Swal.fire("Thất bại", "Số điện thoại không hợp lệ", "error");
        }
        setStatus(false);
        setShowPopup(true);
      }
    };
    add(data);
    setIsLoading(false);
  };

  const handleUpdateAddress = async () => {
    setIsLoading(true);
    const data = {
      address: JSON.stringify({
        detail: detailAddress,
        province: provinceCur.ProvinceName,
        district: districtCur.DistrictName,
        ward: wardCur.WardName,
        code: {
          to_province_id: provinceCur.ProvinceID,
          to_district_id: districtCur.DistrictID,
          to_ward_code: wardCur.WardCode,
        },
      }),
    };
    const res = await ApiAddress.Update({
      aid: aid,
      name: infoUser.name,
      phone: infoUser.phone,
      address: data.address,
    });
    if (res.status === 0) {
      Swal.fire("Thành công", "Đã sửa địa chỉ thành công", "success");
    }
    setIsLoading(false);
    setShowPopupAddress(false);
    setIsUpdating(false);
  };

  //GET FEE SHIP
  const handleGetFeeShip = async () => {
    if (selectAddress.id === "") return;
    const res = await ApiCheckout.getFeeShip(selectAddress.code);
    if (res.status === 200) {
      setCanCheckOut(true);
      setShipFee(res?.data?.data?.total);
    }
  };

  //GET Free ship
  useEffect(() => {
    if (shipFee === 0) return;
    if (totalPriceProducts > 500000) {
      setDiscountPrice(shipFee);
      setTotalPrice(totalPriceProducts);
    } else {
      setDiscountPrice(0);
      setTotalPrice(totalPriceProducts + shipFee);
    }
  }, [shipFee]);

  //GET total products price
  useEffect(() => {
    dataBill?.map((product) =>
      setTotalPriceProducts((prev) => prev + product?.price * product.quanity)
    );
  }, [dataBill]);

  //Checkout Bill
  const handleCheckoutBill = async () => {
    try {
      let data = {
        shipPrice: shipFee,
        aid: selectAddress?.id,
      };
      let res = await ApiCheckout.create(data);
      await ApiCart.delete({ cids: [...cidList] });
      if (res.status === 0) window.location.href = "/ho-so/hoa-don-cua-toi";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Mobile */}
      {isLoading && <Loading></Loading>}
      <div
        className="md:hidden h-full relative"
        onClick={() => setShowPopup(false)}
      >
        <DownPopup
          setShowPopup={setIsChoosingAddress}
          showPopup={isChoosingAddress}
        >
          <div>
            <div className="flex justify-between border-b-[1px] mb-[20px]">
              <span className="font-semibold min-w-[60%] text-darkGrey pb-2 lg:text-[16px] md:text-[14px]">
                {address.length > 0 ? "Chọn địa chỉ" : "Chưa có địa chỉ"}
              </span>

              <div>
                <AiOutlinePlus className="inline text-primary text-[14px] mr-[13px]"></AiOutlinePlus>
                <span
                  onClick={() => {
                    setShowPopupAddress(true);
                    setIsChoosingAddress(false);
                  }}
                  className="font-bold  text-primary cursor-pointer"
                >
                  Thêm địa chỉ
                </span>
              </div>
            </div>
            <div className="h-[224px] overflow-auto">
              {address.length > 0 &&
                address?.map((addres, index) => {
                  const data = JSON.parse(addres.address);

                  return (
                    <div
                      className="flex cursor-pointer [&:not(:first-child)]:mt-[23px]"
                      key={addres.id}
                    >
                      <input
                        type="radio"
                        className="mr-4"
                        value={addres.id}
                        checked={
                          selectAddress.id
                            ? selectAddress.id === addres.id
                            : index === 0
                        }
                        onClick={() =>
                          setSelectAddress({ id: addres.id, code: data.code })
                        }
                      />

                      <div
                        className=" w-[67%] mr-[15px]"
                        onClick={() =>
                          setSelectAddress({ id: addres.id, code: data.code })
                        }
                      >
                        <div className="flex">
                          <p className="font-semibold text-[14px]">
                            {addres.name}
                          </p>
                        </div>
                        <div className="flex">
                          <p className="font-medium text-[14px] mt-[8px] mb-[4px]">
                            {addres.phone}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-[14px]">{`${data.detail}-${data.ward} - ${data.district} - ${data.province}`}</p>
                        </div>
                      </div>

                      <div
                        className="font-semibold text-[14px] mr-[15px] text-primary"
                        onClick={() => {
                          setShowPopupAddress(true);
                          setIsChoosingAddress(false);
                          setIsUpdating(true);
                          setAid(addres.id);
                          setInfoUser({
                            name: addres.name,
                            phone: addres.phone,
                          });
                          setDetailAddress(data.detail);
                        }}
                      >
                        Sửa
                      </div>
                      <div
                        className="font-semibold text-[14px] text-red"
                        onClick={() => {
                          setIsLoading(true);
                          const deleteAddress = async () => {
                            const res = await ApiAddress.delete({
                              aids: [addres.id],
                            });
                            if (res.status === 0) {
                              Swal.fire(
                                "Thành công",
                                "Đã xóa địa chỉ thành công",
                                "success"
                              );
                            }
                          };
                          deleteAddress();
                          setShowPopupAddress(false);
                          fetchAddress();
                          setIsLoading(false);
                        }}
                      >
                        Xóa
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="relative">
              <LongButton
                width="200px"
                height="40px"
                backgroundColor="#1B4B66"
                size="14px"
                color="white"
                position="absolute  right-2"
                handleClick={() => handleGetFeeShip()}
              >
                <p>Xác nhận địa chỉ</p>
              </LongButton>
            </div>
          </div>
        </DownPopup>

        <div className="top-0 w-full bg-white min-h-[56px] flex items-center">
          <div className="min-h-[26px] w-[90%] flex text-2xl">
            <div
              className=" flex items-center justify-center w-[15%] text-center "
              onClick={() => {
                const deleteCacheHanlder = async () => {
                  await deleteCache();
                };
                deleteCacheHanlder();
                navigate(-1);
              }}
            >
              <MdArrowBackIos className="text-primary" />
            </div>
            <div className=" h-full text-primary font-semibold">Thanh toán</div>
          </div>
        </div>

        <div className="bg-white">
          <div className="mx-[16px] mt-[16px]">
            <p className="text-darkGrey font-semibold text-[14px] mb-[8px]">
              Giao tới
            </p>
            <div className="flex text-white items-center rounded-[8px] py-[11px] pl-[16px] pr-[19px] bg-[#f4f4f4]">
              <div className="flex-1">
                <p className="font-semibold text-black text-[14px]">
                  {address ? address[0]?.name : " "}
                </p>

                <div className="flex font-medium text-darkGrey text-[14px] gap-[10px]">
                  <p>
                    {address
                      ? address[0]?.address &&
                        JSON.parse(address[0]?.address).detail
                      : ""}
                  </p>
                  <p>
                    {address
                      ? address[0]?.address &&
                        JSON.parse(address[0]?.address).ward
                      : ""}
                  </p>
                </div>
              </div>
              <div
                className="px-[8px] py-[10px] bg-primary rounded-[8px] flex-2"
                onClick={() => {
                  setIsChoosingAddress(true);
                }}
              >
                <BsPencil size="24" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex font-semibold text-darkGrey mt-[24px] mx-[16px] items-center mb-[16px]">
              Hóa đơn
            </div>
            <div className="px-[16px] overflow-auto h-[270px] scroll-smooth">
              {/* product */}
              {dataBill.map((product) => {
                return <CartItemCombined data={product} key={product.id} />;
              })}
            </div>
          </div>

          <div className="mt-[38px] mx-[16px]">
            <p className="text-[14px] font-semibold text-darkGrey ">
              Thông tin hóa đơn
            </p>
            <div className="flex justify-between text-[14px] font-medium text-darkGrey">
              <div className="w-1/2 flex flex-col gap-[8px]">
                <p className="mt-[10px]">Tổng đơn hàng : </p>
                <p>Phí vận chuyển : </p>
                <p>Giảm giá : </p>
                {/* <p className="font-bold text-black">Grand Total : </p> */}
              </div>
              <div className="w-1/3 flex flex-col gap-[8px] font-medium text-[14px] text-black text-right">
                <p className="mt-[10px]">{numFormatter(totalPriceProducts)}</p>
                <p>{numFormatter(shipFee)}</p>
                <p>{numFormatter(discountPrice)}</p>
                {/* <p className="font-extrabold">{numFormatter(100000)}</p> */}
              </div>
            </div>
            <div className="flex justify-between font-bold text-gray-500 mb-[24px] mt-[8px]">
              <div className="w-1/2 ">
                <p className="font-semibold text-[14px] text-black">
                  Tổng hóa đơn :{" "}
                </p>
              </div>
              <div className="w-1/3  text-black text-right">
                <p className="font-semibold">{numFormatter(totalPrice)}</p>
              </div>
            </div>
          </div>
          <div className="mx-[12px] pb-[24px]">
            <Button2
              handleClick={() => handleCheckoutBill()}
              disable={!canCheckOut}
              text={"Đặt hàng"}
            />
          </div>
        </div>
        <AddAddressPopup
          infoUser={infoUser}
          setInfoUser={setInfoUser}
          province={province}
          setProvinceCur={setProvinceCur}
          provinceCur={provinceCur}
          district={district}
          setDistrictCur={setDistrictCur}
          districtCur={districtCur}
          ward={ward}
          setWardCur={setWardCur}
          wardCur={wardCur}
          detailAddress={detailAddress}
          setDetailAddress={setDetailAddress}
          setShowPopupAddress={setShowPopupAddress}
          showPopupAddress={showPopupAddress}
          handleAddAdress={handleAddAdress}
          isUpdating={isUpdating}
          handleUpdateAddress={handleUpdateAddress}
        />
      </div>

      {/* Desktop */}
      <div className="md:block hidden w-full ">
        <div className="md:ml-[24px] lg:ml-[16px] hidden md:block">
          <BreadCrumb
            parent={[{ name: "Trang chủ", link: "/" }]}
            current="Thanh toán"
          ></BreadCrumb>
        </div>
        <h2 className=" md:text-[28px] lg:text-[34px] m-5 font-semibold text-primary">
          Địa chỉ giao hàng
        </h2>
        <div className="flex min-h-[650px] bg-white">
          <div className="w-[60%] flex flex-col p-5">
            <div className="flex h-fit bg-gray-300 rounded-t-md">
              <div
                className={`w-1/2 font-bold text-center p-3 m-2 rounded-xl ${
                  selected === true ? "bg-primary text-white" : ""
                } cursor-pointer`}
                onClick={() => setSelected(true)}
              >
                Chọn địa chỉ
              </div>
              <div
                className={`w-1/2 font-bold text-center p-3 m-2 rounded-xl ${
                  selected === false ? "bg-primary text-white" : ""
                } cursor-pointer`}
                onClick={() => setSelected(false)}
              >
                Thêm địa chỉ
              </div>
            </div>
            <div className=" h-full flex-auto p-3">
              {!selected ? (
                <>
                  <div className="w-full pt-[24px] p-3 h-[34%]">
                    <p className="md:text-[14px] lg:text-[16px] font-medium text-black">
                      Thông tin liên lạc
                    </p>
                    <hr />
                    <div className="w-full h-[42px] my-3">
                      <InputCustomWidth
                        placeholder="Họ và tên"
                        value={infoUser.name}
                        setValue={setInfoUser}
                        type="name"
                      />
                    </div>
                    <div className="">
                      <div className="w-full h-[42px]">
                        <InputCustomWidth
                          placeholder="Số điện thoại"
                          value={infoUser.phone}
                          setValue={setInfoUser}
                          type="phone"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-3 h-[66%] flex flex-col justify-between">
                    <div className="">
                      <p className="md:text-[14px] lg:text-[16px] font-medium text-black">
                        Địa chỉ giao hàng
                      </p>
                      <hr />
                      <div className="w-full h-[42px] my-3">
                        <SelectPayment
                          options={province}
                          type="ProvinceName"
                          setSelectValue={setProvinceCur}
                          selectValue={provinceCur}
                        />
                      </div>

                      <div className="w-full mb-3 h-[42px]">
                        <SelectPayment
                          options={district}
                          type="DistrictName"
                          setSelectValue={setDistrictCur}
                          selectValue={districtCur}
                        />
                      </div>
                      <div className="w-full h-[42px]">
                        <SelectPayment
                          options={ward}
                          type="WardName"
                          setSelectValue={setWardCur}
                          selectValue={wardCur}
                        />
                      </div>
                      <div className="">
                        <div className="w-full h-[42px] m-[8px]">
                          <InputCustomWidth
                            value={detailAddress}
                            setValue={setDetailAddress}
                            placeholder="Địa chỉ chỉ chi tiết... vd: số 15 ngõ 118 đường Tôn Đức Thắng"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="" onClick={() => handleAddAdress()}>
                      <Button2 text="Thêm địa chỉ" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="">
                    <div className="flex justify-center">
                      <span className="font-semibold text-darkGrey pb-2 lg:text-[16px] md:text-[14px] mb-3">
                        {address.length > 0
                          ? "Vui lòng chọn địa chỉ giao hàng"
                          : "Chưa có địa chỉ được lưu trước đây"}
                      </span>
                    </div>

                    <div className="h-[410px] overflow-auto">
                      {address.length > 0 &&
                        address?.map((addres, index) => {
                          const data = JSON.parse(addres.address);

                          return (
                            <div
                              className="flex pb-3 cursor-pointer w-full"
                              key={addres.id}
                            >
                              <input
                                type="radio"
                                className="mr-4"
                                value={addres.id}
                                checked={
                                  selectAddress.id
                                    ? selectAddress.id === addres.id
                                    : index === 0
                                }
                                onClick={() =>
                                  setSelectAddress({
                                    id: addres.id,
                                    code: data.code,
                                  })
                                }
                                onChange={() => console.log(selectAddress)}
                              />
                              <div
                                className="w-full"
                                onClick={() =>
                                  setSelectAddress({
                                    id: addres.id,
                                    code: data.code,
                                  })
                                }
                              >
                                <div className="flex w-full">
                                  <span>Tên người nhận : </span>
                                  <p>{addres.name}</p>
                                </div>
                                <div className="flex w-full">
                                  <span>Số điện thoại : </span>
                                  <p>{addres.phone}</p>
                                </div>
                                <div className="flex w-full">
                                  <span className="w-[12%]">Địa chỉ :</span>
                                  <p className="font-bold w-[85%]">{`${data.detail}-${data.ward} - ${data.district} - ${data.province}`}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {/* <div className="p-3">
                      <Button2
                        handleClick={() => handleGetFeeShip()}
                        text="Xác nhận địa chỉ nhận hàng"
                      />
                    </div> */}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-[38%] pt-0 justify-evenly">
            <div className="mt-[20px]">
              {/* <p className="w-[55%]">Sản phẩm</p>
              <p className="w-[20%] text-center">Số lượng</p>
              <p className="w-[25%] text-center">Giá</p> */}
              <p className="font-semibold lg:text-[14px] md:text-[12px] border-b-[1px] pb-[8px]">
                Hóa đơn
              </p>
            </div>
            <div className=" overflow-auto h-[275px] scroll-smooth">
              {/* product */}
              {dataBill.map((product) => {
                return <CartItemCombined data={product} />;
              })}
            </div>
            <div className="mb-[16px]">
              <p className="lg:text-[14px] md:text-[12px] font-semibold border-b-[1px] pb-[8px] mt-[40px]">
                Thông tin hóa đơn
              </p>

              <div className="flex justify-between font-medium text-darkGrey lg:text-[16px] md:text-[14px] mt-[35px] pr-[23px]">
                <div className="w-1/2  flex flex-col gap-[12px]">
                  <p>Tổng đơn hàng : </p>
                  <p>Phí vận chuyển : </p>
                  <p>Giảm giá : </p>
                  {/* <p className="font-bold text-black">Grand Total : </p> */}
                </div>
                <div className="w-1/3  text-black text-right flex flex-col gap-[12px]">
                  <p>{numFormatter(totalPriceProducts)}</p>
                  <p>{numFormatter(shipFee)}</p>
                  <p>{numFormatter(discountPrice)}</p>
                  {/* <p className="font-extrabold">{numFormatter(100000)}</p> */}
                </div>
              </div>
              <div className="flex justify-between font-semibold text-darkGrey lg:text-[16px] mt-[12px] mb-[16px] pr-[23px]">
                <div className="w-1/2 ">
                  <p className="font-bold text-black">Tổng hóa đơn : </p>
                </div>
                <div className="text-black text-center">
                  <p className="font-extrabold">{numFormatter(totalPrice)}</p>
                </div>
              </div>
              <Button2
                handleClick={() => handleCheckoutBill()}
                disable={canCheckOut ? false : true}
                text={"Đặt hàng"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAddress;
