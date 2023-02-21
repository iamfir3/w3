import { useNavigate } from "react-router-dom";
const Header = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div
      className="h-[56px] w-full flex items-center pl-[16px] bg-white"
      onClick={() => {
        navigate(-1);
      }}
    >
      {children}
    </div>
  );
};

export default Header;
