import { Link } from "react-router-dom";
import image from "../assets/anonAvatar.png";
import { useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import SideNavigateMenu from "../components/SideNavigateMenu";
import MobileNav from "./MobileNav";

const MenuNav = ({setShowMenuNav,showMenuNav}) => {
  const { isLoggedIn, userCurrent } = useSelector((state) => state.auth);
  const {categories} = useSelector((state) => state.app);
  return (
    <div className={`fixed w-screen h-screen bg-[rgba(0,0,0,.25)] z-60 ${!showMenuNav?'translate-x-[-100%]' :'translate-x-[0]'} transition-all md:hidden`} onClick={()=>{setShowMenuNav(false)}}>
      <div className="w-[82%] h-full bg-lightGrey flex flex-col gap-[8px]" onClick={(e)=>{e.stopPropagation()}}>
        <div className="flex items-center p-[16px] bg-white">
          <Link
            to="/ho-so"
            className="w-full h-[74px] bg-lightGrey rounded-[8px] flex items-center p-[16px] gap-[16px]"
          >
            <div className="h-[42px] w-[42px]">
              <img src={image} className=" h-full w-full object-fit rounded-[50%]" />
            </div>
            <div className="w-[55%]">
              <p className="font-semibold text-[20px] text-black">
                {!isLoggedIn ? "Bạn chưa đăng nhập" : `Xin chào, ${userCurrent?.name}`}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <IoIosArrowForward size="24" className="text-darkGrey" />
            </div>
          </Link>
        </div>
        <div className="bg-white py-[12px]">
            <p className="text-darkGrey font-medium text-sm pl-[16px] mb-[5px]">Gian hàng</p>
            {categories?.map((category,i)=>{ 
                return <MobileNav key={i} title={category.valueVi}></MobileNav>
            })}
        </div>

        <div className="bg-white py-[12px]">
            <p className="text-darkGrey font-medium text-sm pl-[16px] mb-[5px]">Liên hệ</p>
            <SideNavigateMenu title='Liên hệ với shop'/>
        </div>

      </div>
    </div>
  );
};

export default MenuNav;
