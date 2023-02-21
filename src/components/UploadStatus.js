import {BsFillCheckCircleFill} from 'react-icons/bs';
import {MdError} from 'react-icons/md';
import {IoIosWarning} from 'react-icons/io'

export const Upload=({content,status})=>{
return <div className='absolute w-[60%] h-[50px] shadow-md gap-[8px] translate-x-[-50%] bg-white rounded-[8px] left-[50%] flex items-center justify-center'>
        <p>{content}</p>
        {status?<BsFillCheckCircleFill size='26' color='#4da801'/>:<MdError size='26' color='#d72828'/>}
    </div>
}

export const NotiStatus = ({content,active,setActive}) => {
    let borderColor = ''
    let icon =''
    let contentDefault = ''
    switch(active){
        case 'success':
            borderColor='border-[#4da801]'
            icon = <BsFillCheckCircleFill size='26' color='#4da801'/>
            contentDefault='Thêm vào giỏ hàng thành công.'
            break;
        case 'warning':
            borderColor='border-[#ffb818]'
            icon = <IoIosWarning size={26} color='#ffb818'/>
            contentDefault='Loại hàng này đã tồn tại. Vui lòng chọn số lượng tại giỏ hàng.'
            break;
        case 'error':
            borderColor='border-[#d72828]'
            icon = <MdError size='26' color='#d72828'/>
            contentDefault='Vui lòng đăng nhập để mua hàng.'
            break;
        default:
            borderColor='border-[#d72828]'
            icon = <MdError size='26' color='#d72828'/>
            break;
    }
    return (<div 
        onAnimationEnd={() => setActive(false)}
        className={`absolute  invisible md:visible z-70 opacity-0 left-[50%] px-[24px] border-solid border-2 ${borderColor} h-[50px]
    shadow-md gap-[8px] transition-all bg-white rounded-[8px] flex items-center justify-center 
    ${active?'animate-show-noti-left':''}`}>
                <p>{content||contentDefault}</p>
                {icon}
            </div>)
}

export const NotiStatusMobile = ({content,active,setActive}) => {
    let borderColor = ''
    let icon =''
    let contentDefault = ''
    switch(active){
        case 'success':
            borderColor='border-[#4da801]'
            icon = <BsFillCheckCircleFill size='26' color='#4da801'/>
            contentDefault='Thành công.'
            break;
        case 'warning':
            borderColor='border-[#ffb818]'
            icon = <IoIosWarning size={26} color='#ffb818'/>
            contentDefault='Giỏ hàng đã có.'
            break;
        case 'error':
            borderColor='border-[#d72828]'
            icon = <MdError size='26' color='#d72828'/>
            contentDefault='Có lỗi xảy ra.'
            break;
        default:
            borderColor='border-[#d72828]'
            icon = <MdError size='26' color='#d72828'/>
            break;
    }
    return (<div 
        onAnimationEnd={() => setActive(false)}
        className={`fixed z-70 md:hidden w-[60%] translate-y-[-70px] translate-x-[35%] h-[50px] border-solid border-2 ${borderColor}
    shadow-md gap-[8px] transition-all bg-white rounded-[8px] flex items-center justify-center 
    ${active?'animate-top-popup2':''}`}>
                <p>{content||contentDefault}</p>
                {icon}
            </div>)
}

