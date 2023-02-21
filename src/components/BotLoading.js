import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import bot from '../assets/chatbot.png'
const BotLoading = () => {
    return (
        <div className='flex items-center gap-2 pt-2'>
            <img src={bot} alt='bot' className='w-8 h-8 relative z-30 object-cover rounded-full mr-1' />
            <ThreeDots
                height="30"
                width="30"
                radius="2"
                color="gray"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}

export default BotLoading