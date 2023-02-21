import { ChangePassword } from "../containers/public";
import { path } from "./constant";

export const menuProfile = [
    { path: '/' + path.PROFILE + path.PERSONAL, text: 'Thông tin cá nhân', keyName: 'personal' },
    { path: '/' + path.PROFILE + path.ORDERS, text: 'Hóa đơn của tôi', keyName: 'orders' },
    {path:'/'+path.PROFILE + path.CHANGE_PASSWORD,text: 'Đổi mật khẩu',keyName: 'changePassword'},
    {path:'/'+path.PROFILE +path.WISH_LIST,text:'Sản phẩm đã thích', keyName: 'wishLish'},
]
export const menuStatus = [
    {
        keyname: 'pending',
        value: 'pending',
        text: 'Đang gói hàng',
    },
    {
        keyname: 'shipping',
        value: 'shipping',
        text: 'Đang vận chuyển',
    },
    {
        keyname: 'completed',
        value: 'completed',
        text: 'Hoàn thành',
    },
    {
        keyname: 'cancel',
        value: 'cancel',
        text: 'Đã hủy',
    },
]