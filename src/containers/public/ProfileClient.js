import SidebarMenu from "../../components/SidebarProfile";
import {Outlet} from "react-router-dom";
const ProfileClient = () => {
  return (
    <div className="flex gap-[21px]">
      <div className="w-[23%] hidden md:block">
        <SidebarMenu />
      </div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileClient;
