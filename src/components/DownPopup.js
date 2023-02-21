import {memo} from 'react';
const DownPopup=({children,setShowPopup,showPopup})=>{
    return <div className={`fixed w-screen h-screen bg-[rgba(0,0,0,.25)] z-50 flex items-end transition-all ${!showPopup? 'translate-y-[100%]' :'translate-y-[0]'}`} onClick={()=>{setShowPopup(false)}}>
        <div className={`rounded-t-[25px] w-full bg-white bottom-0 ${!showPopup? 'translate-y-[100%]' :'translate-y-[0]'} delay-200 transition-all pt-[24px] px-[16px]`} onClick={(e)=>{e.stopPropagation()}}>
            {children}
        </div>
    </div>
}

export default memo(DownPopup);