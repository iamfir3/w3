import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import popupReducer from "./popupReducer";
import appReducer from "./appReducer";
import homenavReducer from "./homenavReducer";
import wishlistReducer from "./wishlistReducer";
import productReducer from "./productReducer";
import searchReducer from "./searchReducer";
import chatbotReducer from "./chatbot";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import changePasswordReducer from "./changePasswordReducer";
import { combineReducers } from "redux";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const authConfig = {
  ...commonConfig,
  key: "auth",
  whitelist: ["isLoggedIn", "accessToken"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  cart: cartReducer,
  app: appReducer,
  popup: popupReducer,
  changePassword: changePasswordReducer,
  products: productReducer,
  homenav: homenavReducer,
  search: searchReducer,
  chatbot: chatbotReducer,
  wishlist:wishlistReducer,
});

export default rootReducer;
