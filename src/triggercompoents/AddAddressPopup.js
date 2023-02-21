import { memo, useState } from "react";
import { MdClose } from "react-icons/md";
import { Upload } from "../components/UploadStatus";
import { LongButton, Button2 } from "../components";
import { InputCustomWidth, SelectPayment } from "../components/InputCtWidth";
import ButtonFooterContainer from "../components/ButtonFooterContainer";

const AddAddressPopup = ({
  infoUser,
  setInfoUser,
  province,
  setProvinceCur,
  provinceCur,
  district,
  setDistrictCur,
  districtCur,
  ward,
  setWardCur,
  wardCur,
  detailAddress,
  setDetailAddress,
  setShowPopupAddress,
  showPopupAddress,
  handleAddAdress,
  isUpdating,
  handleUpdateAddress,
  aid,
}) => {
  const [status, setStatus] = useState();
  const [isClick, setIsClick] = useState(false);

  return (
    <div
      className={`fixed w-screen top-0 h-screen bg-white z-30 md:hidden ${
        !showPopupAddress ? "translate-x-[100%]" : "translate-x-[0]"
      } transition-all`}
    >
      <header className="bg-white h-[56px] pl-[16px] flex items-center text-primary">
        <div
          onClick={() => {
            setShowPopupAddress(false);
          }}
        >
          <MdClose size="35px" className="text-primary mr-[20px]" />
        </div>
        <p className="text-[20px] font-semibold">Thêm địa chỉ</p>
      </header>
      <div>
        <div className="w-full pt-[24px] p-3 h-[34%]">
          <p className="font-semibold text-[14px] text-darkGrey pb-[8px]">
            Thông tin người nhận
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
          <div className=" font-semibold text-[14px] text-darkGrey pb-[8px]">
            <p className="pb-[8px]">Địa chỉ giao hàng</p>
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
              <div className="w-full h-[42px] mr-[16px] mt-[8px]">
                <InputCustomWidth
                  value={detailAddress}
                  setValue={setDetailAddress}
                  placeholder="Địa chỉ chỉ chi tiết... vd: số 15 ngõ 118 đường Tôn Đức Thắng"
                />
              </div>
            </div>
          </div>

          <ButtonFooterContainer >
            <div className="w-full mr-[24px]" onClick={() =>  { 
              if(isUpdating){
                handleUpdateAddress();
              }
              else
              handleAddAdress()}}>
              <Button2 text="Lưu địa chỉ" />
            </div>
          </ButtonFooterContainer>
        </div>
        {/* <div className="w-[80%] mx-auto text-center font-bold text-highlight">Vui lòng điền đầy đủ thông tin để thêm địa chỉ mới</div> */}
      </div>
    </div>
  );
};

export default memo(AddAddressPopup);
