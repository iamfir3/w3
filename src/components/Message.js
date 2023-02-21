import React, { memo, useState, useEffect } from 'react'
import bot from '../assets/logo192.png'
import Postcard from './Postcard'
import { MdOutlineNavigateNext, MdKeyboardArrowLeft } from 'react-icons/md'
// import { formatMoney } from '../ultis/format'
import { GoPrimitiveDot } from 'react-icons/go'
import { Scrollbars } from 'react-custom-scrollbars-2'

const Message = ({ text, isBot, postcard, className, list, detail }) => {
    const [direction, setDirection] = useState(null)
    const [index, setIndex] = useState(0)
    useEffect(() => {
        let postcardEls = document.getElementsByClassName(className)
        let step = index * 208
        if (direction === 'right') {
            for (let postcard of postcardEls) {
                postcard.style.cssText = `transform: translateX(-${step}px);transition: transform 0.3s ease-out`
            }
        }
        if (direction === 'left') {
            for (let postcard of postcardEls) {
                postcard.style.cssText = `transform: translateX(-${step}px);transition: transform 0.3s ease-out`
            }
        }
    }, [direction, index])
    return (
        <div className={`w-full flex ${isBot ? 'justify-start' : 'justify-end'} ${!isBot && 'pr-2'} items-end`}>
            {isBot && <img src={bot} alt='bot' className='w-8 h-8 relative z-30 object-cover rounded-full mr-1' />}
            {text && <div className={`max-w-[80%] z-30 ${isBot ? 'bg-gray-600' : 'bg-blue-600'} rounded-md p-2`} >
                {text}
            </div>}
            {list && <div className={`max-w-80 z-30 ${isBot ? 'bg-gray-600' : 'bg-blue-600'} rounded-md p-2`}>
                <h4 className='font-medium text-orange-200' >{list.title}</h4>
                {list?.text?.map(i => {
                    return (
                        <div className='border-b py-2' key={i.id} >
                            <p className='flex gap-1 items-center'><GoPrimitiveDot /> Sản phẩm: {i.product}</p>
                            <p className='flex gap-1 items-center'><GoPrimitiveDot /> Số lượng: {i.quantity} cái</p>
                            <p className='flex gap-1 items-center'><GoPrimitiveDot /> Giá mỗi cái: {(+i.price)} vnđ</p>
                        </div>
                    )
                })}
                <p className='pt-3 text-orange-200' >Tổng cộng: {(list?.total)} vnđ</p>
                <p className=' text-orange-200' >SĐT: {list?.customerInfo?.phone}</p>
                <p className=' text-orange-200' >Địa chỉ: {list?.customerInfo?.address}</p>
            </div>}
            {postcard && <div className='md:flex hidden z-20 gap-2 relative'>
                {postcard?.length > 0 && postcard.map(i => {
                    return (
                        <Postcard
                            key={i.id}
                            isBot={isBot}
                            image={i.image}
                            title={i.title}
                            subtitle={i.subtitle}
                            btns={i.btns}
                            isSlick={postcard.length > 1 ? true : false}
                            className={className}
                            id={i.id}
                        />
                    )
                })}
                <div className='md:block hidden absolute top-0 left-[240px] bottom-0 w-12 bg-gray-800'></div>
                <div className='md:block hidden absolute top-0 left-[-48px] bottom-0 w-12 bg-gray-800'></div>
                {postcard?.length > 1 && <>
                    {index && <button
                        type='button'
                        onClick={() => {
                            setDirection('left')
                            setIndex(prev => prev - 1)
                        }}
                        className='md:flex hidden outline-none w-10 h-10 rounded-full bg-gray-600 absolute top-[50%] left-[-25px] items-center justify-center hover:bg-gray-400'
                    >
                        <MdKeyboardArrowLeft size={28} color={'white'} />
                    </button>}
                    {index !== postcard?.length - 1 && <button
                        type='button'
                        onClick={() => {
                            setDirection('right')
                            setIndex(prev => prev + 1)
                        }}
                        className='md:flex hidden outline-none w-10 h-10 rounded-full bg-gray-600 absolute top-[50%] left-[225px] items-center justify-center hover:bg-gray-400'
                    >
                        <MdOutlineNavigateNext size={28} color={'white'} />
                    </button>}
                </>}
            </div>}
            {postcard && <div className='md:hidden max-w-80 flex z-20 gap-2 relative'>
                <Scrollbars style={{ width: '300px', height: '258px' }} >
                    <div className='flex items-center gap-2'>
                        {postcard?.length > 0 && postcard.map(i => {
                            return (
                                <Postcard
                                    key={i.id}
                                    isBot={isBot}
                                    image={i.image}
                                    title={i.title}
                                    subtitle={i.subtitle}
                                    btns={i.btns}
                                    isSlick={postcard.length > 1 ? true : false}
                                    className={className}
                                    id={i.id}
                                />
                            )
                        })}
                    </div>
                </Scrollbars>
                {/* <div className='absolute top-0 left-[240px] bottom-0 w-12 bg-gray-800'></div> */}
                {postcard?.length > 1 && <>
                    {index !== 0 && <button
                        type='button'
                        onClick={() => {
                            setDirection('left')
                            setIndex(prev => prev - 1)
                        }}
                        className='md:flex hidden outline-none w-10 h-10 rounded-full bg-gray-600 absolute top-[50%] left-[-25px] items-center justify-center hover:bg-gray-400'
                    >
                        <MdKeyboardArrowLeft size={28} color={'white'} />
                    </button>}
                    {index !== postcard?.length - 1 && <button
                        type='button'
                        onClick={() => {
                            setDirection('right')
                            setIndex(prev => prev + 1)
                        }}
                        className='md:flex hidden outline-none w-10 h-10 rounded-full bg-gray-600 absolute top-[50%] left-[225px] items-center justify-center hover:bg-gray-400'
                    >
                        <MdOutlineNavigateNext size={28} color={'white'} />
                    </button>}
                </>}
            </div>}
            {/* {detail && <div>
                <DetailProductChatbot />
            </div>} */}
        </div >
    )
}

export default memo(Message)