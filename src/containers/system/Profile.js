import React from "react";
import { Button2, SidebarProfile } from "../../components";
import icons from "../../ultils/icons";
import { Outlet, useLocation, Navigate,useNavigate  } from "react-router-dom";
import { menuProfile } from "../../ultils/menu";
import { useSelector, useDispatch} from "react-redux";
import { path } from "../../ultils/constant";
import * as actions from "../../store/actions";

const { FiLogOut, MdOutlineArrowBackIosNew } = icons;

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { detailOrder } = useSelector((state) => state.app);

  if (!isLoggedIn) return <Navigate to={path.LOGIN} />;
  return (
    <div className="px-5 md:py-6 md:h-full">
      <div className="pb-6 items-center justify-between pr-[76px] hidden md:flex">
        {!detailOrder && (
          <h3 className="lg:text-[34px] md:text-[24px] font-bold text-[#1B4B66]">
            {menuProfile.find((item) => item.path === location.pathname)?.text}
          </h3>
        )}
        {detailOrder && (
          <div className="flex items-center gap-4 text-[#1B4B66]">
            <span
              title="Quay lại"
              onClick={() => dispatch(actions.detailOrder(null))}
              className="cursor-pointer"
            >
              <MdOutlineArrowBackIosNew size={24} />
            </span>
            <h3 className="text-[34px] font-bold">{`Hoá đơn #${detailOrder?.id
              ?.replace(/\D/g, "")
              ?.slice(0, 9)}`}</h3>
          </div>
        )}
        <div onClick={() => {
          dispatch(actions.logout())
          dispatch(actions.fetchCartQuantity('notLogin'));
          navigate('/');
          }}>
          <Button2
            text="Đăng xuất"
            icBefore={<FiLogOut />}
            style="bg-white text-[#1B4B66] border border-[#1B4B66] px-4"
          />
        </div>
      </div>
      <div className="flex gap-[22px]">
        <div className="lg:w-[286px] md:w-[190px] flex-none hidden md:block">
          <SidebarProfile />
        </div>
        <div className="w-full md:flex-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
