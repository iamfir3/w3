import { Routes, Route, useNavigate, useNavigation } from "react-router-dom";
import takeParamsVerifyToken from "./ultils/takeParamsVerifyToken";
import { BsArrowLeftCircleFill } from "react-icons/bs";

import {
  Public,
  Login,
  Home,
  DetailProduct,
  Category,
  ProfileClient,
  UserMobileNav,
  Personal,
  Mycart,
  CheckOut,
  Search,
  AddAddress,
  ChangePassword,
  WishList,
  ItemOrder,
} from "./containers/public";
import Profile from "./containers/system/Profile";
import { path } from "./ultils/constant";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions";
import { useEffect, useState, useRef } from "react";
import { fetchWishlist } from "./store/actions/wishlistAction";
import ListProducts from "./containers/public/ListProduct";

function App() {
  const { isLoggedIn, userCurrent } = useSelector((state) => state.auth);
  const { buyData } = useSelector((state) => state.chatbot);
  const [show, setShow] = useState(false);
  const [selectProductEdit, setSelectProductEdit] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);
  console.log(buyData);
  // Khi reload page get userdata again
  useEffect(() => {
    isLoggedIn &&
      setTimeout(() => {
        dispatch(actions.getCurrent());
      }, 100);
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(actions.getCategory());
    if (window.location.href.includes("verify-token")) {
      const params = takeParamsVerifyToken(window.location.href);
      dispatch(
        actions.saveUseridToken({
          userId: params[params.length - 2],
          tokenChangePassword: params[params.length - 1],
        })
      );
      navigate("/ho-so/doi-mat-khau");
    }
  }, []);

  return (
    <div className="bg-lightGrey m-auto overflow-y-auto h-screen relative">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.USERMOBILENAV} element={<UserMobileNav />} />
          <Route path={path.SEARCH} element={<Search />}></Route>

          <Route path={path.WISH_LIST} element={<WishList></WishList>}></Route>
          <Route path={path.PROFILE} element={<Profile />}>
            <Route path={path.PERSONAL} element={<Personal />} />
            <Route
              path={path.CHANGE_PASSWORD}
              element={<ChangePassword></ChangePassword>}
            ></Route>
            <Route
              path={path.WISH_LIST}
              element={<WishList></WishList>}
            ></Route>

            <Route path="*" element={<Personal />} />
          </Route>

          <Route
            path={path.SEARCH__KEYWORD}
            element={<ListProducts categoryData="" otherData="Tìm kiếm" />}
          ></Route>
        </Route>

        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
