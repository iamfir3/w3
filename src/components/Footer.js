import React from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { generatePath } from '../ultils/fn'
import icons from '../ultils/icons'

const { BsFacebook, BsYoutube, MdOutlineLocationOn, AiOutlineCopyrightCircle } = icons

const Footer = () => {
    const { categories } = useSelector(state => state.app)
    return (
        <div className='text-gray-400 bg-[#1B4B66] w-full h-full flex flex-col md:flex-row justify-between px-4 md:px-[60px] py-8'>
            <div className='flex flex-col md:flex-row gap-6 md:gap-[60px]'>
                <div className='flex flex-col md:gap-3 gap-1'>
                    <h4 className='text-white font-bold'>Shop by categories</h4>
                    {categories?.map(item => (
                        <Link
                            key={item.code}
                            to={`/${generatePath(item?.valueVi)}`}
                        >
                            {item.valueVi}
                        </Link>
                    ))}
                </div>
                <div className='flex flex-col md:gap-3 gap-1'>
                    <h4 className='text-white font-bold'>About</h4>
                    <Link to={`/`}>Contact us</Link>
                    <Link to={`/`}>About us</Link>
                </div>
            </div>
            <div className='flex flex-col md:items-end gap-[26px] mt-6 md:mt-0 pt-6 md:pt-0 border-t border-gray-300 md:border-none'>
                <div className='flex items-center gap-4'>
                    <BsFacebook size={38} />
                    <span className='w-[38px] h-[38px] rounded-full flex items-center justify-center bg-gray-400'>
                        <BsYoutube color='#1B4B66' size={25} />
                    </span>
                </div>
                <div className='flex flex-col gap-2 md:items-end'>
                    <span className='flex items-end text-white gap-2'>
                        <MdOutlineLocationOn size={25} />
                        <span className='font-bold'>Việt Nam</span>
                    </span>
                    <span className='flex items-center gap-2'>
                        <AiOutlineCopyrightCircle />
                        <span>2022 |</span>
                        <span>Motion Team All Rights Reserved</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(Footer)