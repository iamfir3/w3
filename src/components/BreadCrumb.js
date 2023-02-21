import {MdOutlineKeyboardArrowRight} from "react-icons/md"
import { useNavigate } from "react-router-dom"

const BreadCrumb=({parent,current})=>{
    const navigate =useNavigate();
    return <div className="flex items-center gap-[8px] ">
        {parent?.map((url,i)=>{
            return <div key={i} onClick={()=>{navigate(url.link)}} className='flex items-center gap-[8px]'>
                <p className="font-medium text-[16px] text-primary cursor-pointer" >{url.name}</p>
                <MdOutlineKeyboardArrowRight className="text-black "></MdOutlineKeyboardArrowRight>
            </div>
        })}
        <p className="font-medium text-[16px] text-darkGrey">{current}</p>
    </div>
}

export default BreadCrumb;