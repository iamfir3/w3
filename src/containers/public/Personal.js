import image from "../../assets/anonAvatar.png";
import LongButton from "../../components/LongButton";
import { RiDeleteBinLine } from "react-icons/ri";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import ApiChangePassword from "../../apis/changePassword";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toBase64, bufferToBase64 } from "../../ultils/common";
import apiUSer from "../../apis/user";
import { info } from "autoprefixer";

const Personal = () => {
  const { userCurrent } = useSelector((state) => state.auth);
  const passwordRef = useRef();
  const inputFileRef = useRef();
  const userNameRef=useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const imageRef=useRef();
  const [infor, setInfo] = useState({
    avatar: "",
    name: "",
  });
  console.log()
  const [isShowErrorLog, setIsShowErrorLog] = useState(false);
  useEffect(()=>{},[imageRef?.current?.value]);
  const handleImage = async (e) => {
    
    e.stopPropagation();
    const { type } = e.target.files[0];
    if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
      let imageBase64 = await toBase64(e?.target?.files[0]);
      setInfo((prev) => ({ ...prev, avatar: imageBase64 }));
    } else {
      console.log("Type image is not supported.");
    }
    
  };
  const handleSubmit = async (email, password) => {
    try {
      const res = await ApiChangePassword.verifyAccount({
        email: email,
        password: password,
      });
      setIsLoading(false);
      if (res.status === 0) Swal.fire("Thành công", res.message, "success");
      else Swal.fire("Thất bại", res.message, "error");
    } catch (err) {
      setIsLoading(false);
      Swal.fire("Thất bại", err.message, "error");
    }
  };
  return (
    <div className=" relative">
      {isLoading && (
        <div className="translate-x-[-16px] z-70 absolute w-full h-full">
          <Loading />
        </div>
      )}
      <div className="md:hidden text-primary translate-x-[-20px]">
        <Header>
          <MdOutlineArrowBackIosNew size="24" />
          <p className="text-[20px] text-primary font-semibold pl-[20px]">
            Thông tin tài khoản
          </p>
        </Header>
      </div>
      <div className="md:pr-[76px]">
        <div>
          <p className="text-[20px] font-semibold border-b-[1px] border-darkGrey-tint pb-[6px] hidden md:block">
            Thông tin cá nhân
          </p>
          <div className="flex items-end gap-[16px] md:mt-[37px]">
            <img
              src={bufferToBase64(userCurrent?.avatar) ||
                userCurrent?.avatarUrl ||
                image}
              className="w-[80px] h-[80px] rounded-[50px]"
              ref={imageRef}
            ></img>
            <div
              className="w-[136px]"
              onClick={() => {
                inputFileRef.current.click();
              }}
            >
              <LongButton
                width="100%"
                height="38px"
                backgroundColor="#1B4B66"
                color="white"
                size="14px"
              >
                <p className="font-medium text-[14px]">Tải lên</p>
              </LongButton>
            </div>
            <input
              type="file"
              id="avatar"
              file={infor.avatar}
              className='hidden'
              onChange={handleImage}
              ref={inputFileRef}
            />
            {/* <div className="border-[2px] border-[#b00020] rounded-[8px] translate-y-[2px]">
              <LongButton
                width="136px"
                height="38px"
                backgroundColor="white"
                color="#B00020"
                size="14px"
              >
                <RiDeleteBinLine />
                <p>Xóa tài khoản</p>
              </LongButton>
            </div> */}
          </div>
          <div className="mt-[24px]">
            <label className="block font-medium text-[16px] text-black">
              Họ và tên
            </label>
            <input
              className="h-[56px] bg-lightGrey rounded-[4px] mt-[6px] outline-primary p-[10px] w-full md:w-[60%]"
              placeholder={userCurrent?.name}
              ref={userNameRef}
              type='text'
            />
          </div>
          {/* <div>
            <label className="block font-medium text-[16px] text-black mt-[8px]">
              {userCurrent?.email ? "Email" : "Số điện thoại"}
            </label>
            <input
              className="h-[56px] bg-lightGrey rounded-[4px] mt-[6px] outline-primary p-[10px] w-full md:w-[60%]"
              placeholder={
                userCurrent?.email ? userCurrent?.email : userCurrent?.phone
              }
            />
          </div> */}
          <div className="flex justify-end mt-[24px]" onClick={()=>{
            const updateProfile=async()=>{
              const res=await apiUSer.update({name:userNameRef.current.value,avatar:infor.avatar})
              
            }
            updateProfile();
          }}>
            <LongButton
              backgroundColor="#1B4B66"
              color="white"
              height="36px"
              width="136px"
            >
              <p className="text-[14px] md:text-[16px] font-medium">
                Lưu thay đổi
              </p>
            </LongButton>
          </div>
        </div>
        <div>
          <p className="text-[20px] font-semibold border-b-[1px] border-darkGrey-tint pb-[6px] mt-[56px]">
            Đổi mật khẩu
          </p>
          <div className="mt-[24px]">
            <label className="block font-medium text-[16px] text-black">
              Mật khẩu hiện tại
            </label>

            <div className="flex items-center w-full md:w-[60%] bg-lightGrey rounded-[4px] mt-[6px] ">
              <input
                className="h-[56px] bg-lightGrey outline-none p-[10px] w-[93%]"
                ref={passwordRef}
                type={`${isShowPassword ? "text" : "password"}`}
                onChange={() => {
                  setIsShowErrorLog(false);
                }}
              />
              {isShowPassword ? (
                <AiOutlineEyeInvisible
                  size="24"
                  className=""
                  onClick={() => {
                    setIsShowPassword((prev) => !prev);
                  }}
                ></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye
                  size="24"
                  className=""
                  onClick={() => {
                    setIsShowPassword((prev) => !prev);
                  }}
                ></AiOutlineEye>
              )}
            </div>
            <p className="text-red pt-[6px]">
              {isShowErrorLog ? "Mật khẩu dài hơn 6 kí tự" : ""}
            </p>
          </div>
        </div>
        <div
          className="flex justify-end mt-[24px]"
          onClick={() => {
            if (passwordRef?.current?.value?.length < 6) {
              setIsShowErrorLog(true);
            } else {
              handleSubmit(userCurrent?.email, passwordRef?.current?.value);
              setIsLoading(true);
            }
            passwordRef.current.value = "";
          }}
        >
          <LongButton
            backgroundColor="#1B4B66"
            color="white"
            height="36px"
            width="136px"
          >
            <p className="text-[14px] md:text-[16px] font-medium">Xác nhận</p>
          </LongButton>
        </div>
      </div>
    </div>
  );
};

export default Personal;
