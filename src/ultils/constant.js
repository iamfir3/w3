import icons from "./icons";

const {
  BsSpeedometer2,
  RiProductHuntLine,
  FaUserEdit,
  IoIosCreate,
  AiOutlineUserAdd,
  RiBillLine,
  BiCategoryAlt,
} = icons;

export const path = {
  LOGIN: "/auth",
  PUBLIC: "/*",
  SYSTEM: "/system/*",
  USERCLIENT: "/user/*",
  WISH_LIST: "san-pham-da-thich",
  HOME: "",
  PAYMENT: "/payment",
  FEED: "/feed",
  CART: "cart/",
  GENERAL: "*",
  CREATE_PRODUCT: "create-product",
  EDIT_PRODUCT: "manage-product/edit-product",
  MANAGE_PRODUCT: "manage-product",
  MANAGE_CATEGORY: "manage-category",
  USERMOBILENAV: "tai-khoan",
  CATEGORY: "gian-hang",
  USER: "user",
  BILL: "bill",
  ANALYST: "thong-ke",
  CREATE_CATEGORY: "create-category",
  UPDATE_PROFILE: "update-profile",
  DISCOUNT: "giam-gia",
  DETAIL: "chi-tiet-san-pham",
  DETAIL__PRODUCTID: "chi-tiet-san-pham/:id",
  PROFILE: "ho-so/",
  CHANGE_PASSWORD: "doi-mat-khau",
  ORDERS: "hoa-don-cua-toi",
  ITEM_ORDERS: "don-hang",
  ITEM_ORDERS_ID: "don-hang/:id",
  NEW_PRODUCTS: "san-pham-moi-nhat",
  BEST_SELLER: "san-pham-ban-chay",
  TOP_FAVOURITE: "san-pham-yeu-thich",
  PERSONAL: "",
  ADD_ADDRESS: "check-out",
  SEARCH: "tim-kiem",
  SEARCH__KEYWORD: "tim-kiem/:id",
};
export const vi_uf8 = {
  shopname: "PhuongThanh",
  all_categories: "Tất cả chủ để",
  phone: "813.672.409",
  support_time: "Hỗ trợ 24/7",
  adress: "102-HUB3-CT8 tập thể Thành Công",
  phone1: "0813672409",
  phone2: "01253322599",
  email: "phuongthanhshophn@gmail.com",
  facebook: "Phuong Thanh's Shop",
  zalo: "01253322599",
  instagram: "pthanh@shop102",
};
export const constant_page = {
  limit_products_outstanding: 15,
  limit_products: 25,
};
export const filters = [
  { valueVi: "Mới nhất", sort: { type: "updatedAt", code: "DESC" } },
  { valueVi: "Cũ nhất", sort: { type: "updatedAt", code: "ASC" } },
  { valueVi: "A-Z", sort: { type: "name", code: "DESC" } },
  { valueVi: "Z-A", sort: { type: "name", code: "ASC" } },
  { valueVi: "Giá cao -> thấp", sort: { type: "costPerUnit", code: "DESC" } },
  { valueVi: "Giá thấp -> cao", sort: { type: "costPerUnit", code: "ASC" } },
];
export const statusFilter = [
  { valueVi: "Vui lòng chọn trạng thái", code: "" },
  { valueVi: "Đang chờ", code: "pending" },
  { valueVi: "Đang giao", code: "shipping" },
  { valueVi: "Thành công", code: "completed" },
  { valueVi: "Đã hủy", code: "cancel" },
];
export const filtersBill = [
  { valueVi: "Mới nhất", sort: { type: "updatedAt", code: "DESC" } },
  { valueVi: "Cũ nhất", sort: { type: "updatedAt", code: "ASC" } },
  {
    valueVi: "Giá trị đơn tăng dần",
    sort: { type: "totalCost", code: "ASC" },
  },
  {
    valueVi: "Giá trị đơn giảm dần",
    sort: { type: "totalCost", code: "DESC" },
  },
];
export const filtersSider = [
  {
    valueVi: "100.000 - 500.000",
    code: 1,
    price:[100000,500000]
  },
  {
    valueVi: "500.000 - 1.000.000",
    code: 2,
    price:[500000,1000000]
  },
  {
    valueVi: "1.000.000 - 1.500.000",
    code: 3,
    price:[1000000,1500000]
  },
];
export const adminMenu = [
  {
    name: "Tổng sản phẩm",
    path: "/system/",
    icon: <BsSpeedometer2 size={24} />,
  },
  {
    name: "Sản phẩm",
    path: "/system/manage-product",
    icon: <RiProductHuntLine size={24} />,
  },
  {
    name: "Người dùng",
    path: "/system/user",
    icon: <AiOutlineUserAdd size={24} />,
  },
  {
    name: "Hóa đơn",
    path: "/system/bill",
    icon: <RiBillLine size={24} />,
  },
  {
    name: "Quản lý gian hàng",
    path: "/system/manage-category",
    icon: <BiCategoryAlt size={24} />,
  },
  {
    name: "Thống kê",
    path: "/system/thong-ke",
    icon: <RiProductHuntLine size={24} />,
  },
  // { name: 'Quản lý thành viên', path: '/system/manage-user', icon: <FaUserEdit size={24} /> },
  {
    name: "Thêm sản phẩm",
    path: "/system/create-product",
    icon: <IoIosCreate size={24} />,
  },
];
