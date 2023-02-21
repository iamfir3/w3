import SideNavigateMenu from "../../components/SideNavigateMenu";
import { IoIosArrowForward } from "react-icons/io";
import image from "../../assets/anonAvatar.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, userDispatch, useDispatch } from "react-redux";
import LongButton from "../../components/LongButton";
import * as actions from "../../store/actions";
const UserMobileNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //hee
  const { isLoggedIn, userCurrent } = useSelector((state) => state.auth);
  return (
    <div className="h-screen">
      <div className="flex h-[56px] items-center pl-[16px]">
        <p className="text-primary font-semibold text-[20px]">Hồ sơ</p>
      </div>
      <Link
        to="/ho-so"
        className="w-[90%] h-[112px] bg-lightGrey rounded-[8px] flex p-[16px] gap-[16px] ml-[16px]"
      >
        <div className="h-[80x] w-[80px]">
          <img src={image} className=" h-full w-full rounded-[50%]" />
        </div>
        <div className="w-[55%]">
          <p className="font-semibold text-[20px] text-black">
            {!isLoggedIn ? "Bạn chưa đăng nhập" : userCurrent?.name}
          </p>
          <p className="font-medium text-[14px] text-lightGrey2 mt-[4px]">
            {userCurrent?.email ? userCurrent.email : userCurrent.phone}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <IoIosArrowForward size="24" className="text-darkGrey" />
        </div>
      </Link>
      {isLoggedIn&& <div>
        <div className="h-[60px] flex items-center">
          <Link to="/ho-so" className="w-full">
            <SideNavigateMenu title="Thông tin cá nhân"></SideNavigateMenu>
          </Link>
        </div>
        <div className="h-[60px] flex items-center">
          <Link to="/ho-so/hoa-don-cua-toi" className="w-full">
            <SideNavigateMenu title="Đơn hàng của tôi"></SideNavigateMenu>
          </Link>
        </div>
        <div className="h-[60px] flex items-center">
          <Link to="/san-pham-da-thich" className="w-full">
            <SideNavigateMenu title="Yêu thích"></SideNavigateMenu>
          </Link>
        </div>
      </div>}

      <div className="flex justify-center mt-[8px]">
        {!isLoggedIn && (
          <div
            onClick={() => navigate("/auth", { state: { flag: false } })}
            className="w-[95%]"
          >
            <LongButton
              backgroundColor="#1B4B66"
              color="white"
              size="14px"
              width="100%"
              height="44px"
            >
              <p>Đăng nhập</p>
            </LongButton>
          </div>
        )}
        {isLoggedIn && (
          <div
            className="border-[2px] border-[#1B4B66] w-[95%] rounded-[8px]"
            onClick={() => dispatch(actions.logout())}
          >
            <LongButton
              backgroundColor="white"
              color="#1B4B66"
              size="14px"
              width="100%"
              height="44px"
            >
              <p>Đăng xuất</p>
            </LongButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMobileNav;
