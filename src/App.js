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

import {
  System,
  General,
  EditProduct,
  ManageProduct,
  ManageCategory,
  User,
  Bill,
  Profile,
  Orders,
  Analyst
} from "./containers/system";
import { Contact, BoxChat } from "./components";
import { path } from "./ultils/constant";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions";
import { useEffect, useState, useRef } from "react";
import { fetchWishlist } from "./store/actions/wishlistAction";
import DetailProductChatbot from './components/DetailProductChatbot'

import { generatePath } from "../src/ultils/fn";
import ListProducts from "./containers/public/ListProduct";

function App() {
  const { isLoggedIn, userCurrent } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.app);
  const { buyData } = useSelector(state => state.chatbot)
  const [isStartChatBot, setIsStartChatBot] = useState(false);
  const [hideChatbot, setHideChatBot] = useState(false);
  const [chatBotPosition, setChatBotPosition] = useState({
    left: "80%",
    top: "50%",
  });
  const [show, setShow] = useState(false);
  const [selectProductEdit, setSelectProductEdit] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chatBotRef = useRef();
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
      {buyData?.isBuy && <div className="fixed z-70 w-screen h-screen flex justify-center items-center bg-overlay-70">
        <DetailProductChatbot pid={buyData?.pid} />
      </div>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.USERMOBILENAV} element={<UserMobileNav />} />
          <Route path={path.DETAIL__PRODUCTID} element={<DetailProduct />} />
          <Route path={path.CATEGORY} element={<Category />}></Route>
          <Route path={path.SEARCH} element={<Search />}></Route>
          <Route path={path.ITEM_ORDERS} element={<ItemOrder />}></Route>
          <Route path={path.ITEM_ORDERS_ID} element={<ItemOrder />}></Route>
          <Route
            path={path.BEST_SELLER}
            element={
              <ListProducts categoryData="" otherData="Sản phẩm bán chạy" />
            }
          ></Route>
          <Route
            path={path.TOP_FAVOURITE}
            element={
              <ListProducts categoryData="" otherData="Sản phẩm yêu thích" />
            }
          ></Route>
          <Route
            path={path.NEW_PRODUCTS}
            element={
              <ListProducts categoryData="" otherData="Sản phẩm mới nhất" />
            }
          ></Route>

          <Route path={path.WISH_LIST} element={<WishList></WishList>}></Route>
          <Route path={path.PROFILE} element={<Profile />}>
            <Route path={path.PERSONAL} element={<Personal />} />
            <Route path={path.ORDERS} element={<Orders />} />
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
          <Route path={path.CART} element={<Mycart />}></Route>
          <Route path={path.ADD_ADDRESS} element={<AddAddress />} />
          {categories?.map((item) => (
            <Route
              key={item.id}
              path={generatePath(item.valueVi)}
              element={<ListProducts categoryData={item} otherData="" />}
            />
          ))}

          <Route
            path={path.SEARCH__KEYWORD}
            element={<ListProducts categoryData="" otherData="Tìm kiếm" />}
          ></Route>
        </Route>

        <Route path={path.LOGIN} element={<Login />} />
        {userCurrent.role?.code === "R1" && (
          <Route path={path.SYSTEM} element={<System />}>
            <Route path={path.GENERAL} element={<General />} />
            <Route path={path.MANAGE_PRODUCT} element={<ManageProduct setSelectProductEdit={setSelectProductEdit} />} />
            <Route path={path.EDIT_PRODUCT} element={<EditProduct selectProductEdit={selectProductEdit} />} />
            <Route path={path.CREATE_PRODUCT} element={<EditProduct />} />
            <Route path={path.MANAGE_CATEGORY} element={<ManageCategory />} />
            <Route path={path.USER} element={<User />} />
            <Route path={path.BILL} element={<Bill />} />
            <Route path={path.ANALYST} element={<Analyst />} />
          </Route>
        )}
      </Routes>
      {window.location.href.split('/')[window.location.href.split('/').length - 1] !== 'auth' && <div>
        <div
          className={`fixed z-10 md:right-[0px] md:top-1/2 ${window.innerWidth < 768
            ? !show
              ? `right-[-3%] top-1/2`
              : " top-[0] left-[0] pt-[50px] pl-[20px] bg-[rgba(0,0,0,.25)]  w-screen h-screen"
            : ""
            } text-primary transition-all text-[30px] ${hideChatbot ? "translate-x-[0vw]" : "translate-x-[20vw]"
            } `}
          onClick={() => {
            setHideChatBot(false);
          }}
        >
          <BsArrowLeftCircleFill></BsArrowLeftCircleFill>
        </div>

        <div
          className={`fixed z-10 md:right-[32px] md:top-1/2 transition-all ${hideChatbot ? "translate-x-[40vw]" : ""
            }  ${window.innerWidth < 768
              ? !show
                ? `left-[80%] top-1/2`
                : " top-[0] left-[0] pt-[50px] pl-[20px] bg-[rgba(0,0,0,.25)]  w-screen h-screen"
              : ""
            } `}
          onClick={() => {
            if (window.innerWidth < 768) {
              setShow((prev) => !prev);
              setIsStartChatBot((prev) => !prev);
            }
          }}
        >
          <Contact
            setIsStartChatBot={setIsStartChatBot}
            show={show}
            hideChatBot={hideChatbot}
            setHideChatBot={setHideChatBot}
          />
        </div>
      </div>}

      <div
        className={`fixed ${isStartChatBot
          ? `${window.innerWidth < 768 ? "top-[12%]" : "bottom-0"}`
          : `${window.innerWidth < 768 ? "top-[100%]" : "bottom-[-100%]"}`
          } transition-all z-10 md:right-[100px] w-full ${window.innerWidth < 768 ? "h-[100%]" : ""
          }  md:w-auto bg-red-500`}
      >
        <BoxChat
          setIsStartChatBot={setIsStartChatBot}
          show={show}
          setShow={setShow}
        />
      </div>
    </div>
  );
}

export default App;
