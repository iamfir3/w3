import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import ApiChangePassword from "../../apis/changePassword";
import InputField from "../../components/InputField";
import {useNavigate } from "react-router-dom"
import LongButton from "../../components/LongButton";
import * as actions from "../../store/actions";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const changePassword = useSelector((state) => state.changePassword);
  const [tokenVerifyEmailSuccess, setTokenVerifyEmailSuccess] = useState("");
  const [isShowPassword, setIsShowPassword] = useState([false, false]);
  const [isShowErrorLog, setIsShowErrorLog] = useState(false);
  const password1Ref = useRef();
  const password2Ref = useRef();

  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  useEffect(() => {
    const fetchChangePassword = async () => {
      const res = await ApiChangePassword.verifyEmail({
        id: changePassword.userId,
        token: changePassword.tokenChangePassword,
      });
      if (res.status === 0) {
        setTokenVerifyEmailSuccess(res?.tokenVerifyEmailSuccess);
        setIsVerifiedEmail(true);
      }
    };

    fetchChangePassword();
  }, []);
  return (
    <div className="bg-white h-screen">
      {isVerifiedEmail && (
        <div>
          <div className="">
            <div>
              <p className="block font-medium text-[16px] text-black">
                Mật khẩu mới
              </p>
              <div className="flex items-center w-full md:w-[60%] bg-lightGrey rounded-[4px] mt-[6px]">
                <input
                  className="h-[56px] bg-lightGrey outline-none p-[10px] w-[93%]"
                  type={`${isShowPassword[0] ? "text" : "password"}`}
                  ref={password1Ref}
                  onChange={() => {
                    setIsShowErrorLog(false);
                  }}
                ></input>
                {isShowPassword[0] ? (
                  <AiOutlineEyeInvisible
                    size="24"
                    className=""
                    onClick={() => {
                      setIsShowPassword((prev) => [!prev[0], prev[1]]);
                    }}
                  ></AiOutlineEyeInvisible>
                ) : (
                  <AiOutlineEye
                    size="24"
                    className=""
                    onClick={() => {
                      setIsShowPassword((prev) => [!prev[0], prev[1]]);
                    }}
                  ></AiOutlineEye>
                )}
              </div>
            </div>

            <div className="mt-[16px]">
              <p className="block font-medium text-[16px] text-black">
                Nhập lại mật khẩu mới
              </p>
              <div className="flex items-center w-full md:w-[60%] bg-lightGrey rounded-[4px] mt-[6px]">
                <input
                  className="h-[56px] bg-lightGrey outline-none p-[10px] w-[93%]"
                  type={`${isShowPassword[1] ? "text" : "password"}`}
                  ref={password2Ref}
                  onChange={() => {
                    setIsShowErrorLog(false);
                  }}
                ></input>
                {isShowPassword[1] ? (
                  <AiOutlineEyeInvisible
                    size="24"
                    className=""
                    onClick={() => {
                      setIsShowPassword((prev) => [prev[0], !prev[1]]);
                    }}
                  ></AiOutlineEyeInvisible>
                ) : (
                  <AiOutlineEye
                    size="24"
                    className=""
                    onClick={() => {
                      setIsShowPassword((prev) => [prev[0], !prev[1]]);
                    }}
                  ></AiOutlineEye>
                )}
              </div>
            </div>
          </div>

          <p className="text-red pt-[6px]">
            {isShowErrorLog ? "Hai mật khẩu không trùng khớp" : ""}
          </p>

          <div
            className="flex justify-end mt-[16px] w-full md:w-[60%]"
            onClick={() => {
              if (password1Ref?.current.value != password2Ref?.current.value) {
                setIsShowErrorLog(true);
              } else {
                const updatePassword = async () => {
                  try {
                    const res = await ApiChangePassword.updatePassword({
                      password: password1Ref.current.value,
                      tokenVerifyEmailSuccess: tokenVerifyEmailSuccess,
                    });
                    if (res.status === 0)
                      Swal.fire("Thành công", res.message, "success");
                      setTimeout(()=>{
                        dispatch(actions.logout())
                        navigate("/");
                      },2000)
                      
                  } catch (err) {}
                  
                };
                updatePassword();
              }
            }}
          >
            <LongButton
              height="44px"
              width="100px"
              backgroundColor="#1B4B66"
              color="white"
              size="14px"
            >
              <p>Xác nhận</p>
            </LongButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
