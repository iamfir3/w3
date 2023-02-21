import React, { memo } from 'react'
import { menuProfile } from '../ultils/menu'
import { NavLink } from 'react-router-dom'
import icons from '../ultils/icons'

const { MdNavigateNext } = icons
const notAvtiveStyle = 'lg:w-[271px] md:w-[180px] h-[72px] flex justify-between items-center font-bold pl-2'
const avtiveStyle = 'lg:w-[271px] md:w-[180px] h-[72px] flex justify-between items-center font-bold border-l-4 border-[#1B4B66] text-[#1B4B66] pl-1'

const SidebarProfile = () => {
    return (
        <div className='flex flex-col w-full bg-[#F1F1F1] rounded-md'>
            {menuProfile.map(item => {if(item.keyName!=='changePassword') return (
                <NavLink
                    key={item.keyName}
                    to={item.path}
                    className={({ isActive }) => isActive ? avtiveStyle : notAvtiveStyle}
                >
                    <span className='md:text-[14px] lg:text-[16px]'>{item.text}</span>
                    <MdNavigateNext size={24} />
                </NavLink>
            )})}
        </div>
    )
}

    export default memo(SidebarProfile)