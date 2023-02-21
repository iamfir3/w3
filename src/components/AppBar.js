import icons from "../ultils/icons";
import { useNavigate } from "react-router-dom";
const { MdArrowBackIos } = icons;
function AppBar({ title,setIsShow }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="top-0 w-full bg-white min-h-[56px] flex items-center">
        <div className="min-h-[26px] w-[90%] flex text-2xl">
          <div
            className=" flex items-center justify-center w-[15%] text-center "
            onClick={() => {
              navigate(-1);
            }}
          >
            <MdArrowBackIos  className="text-primary"/>
          </div>
          <div className=" h-full text-primary font-semibold">{title}</div>
        </div>
      </div>
    </>
  );
}

export default AppBar;
