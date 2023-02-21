import React, { useRef, useEffect } from 'react'
import Message from './Message'
import BotLoading from './BotLoading';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react';
import * as actions from '../store/actions'


const Messages = ({ isStart, setIsStart }) => {
    const dispatch = useDispatch()
    const { messages, isLoadingBot, buyData } = useSelector(state => state.chatbot)
    const viewRef = useRef()
    const handleSendMessage = async (i) => {
        setIsStart(true)
        dispatch(actions.addTextUser(i))
        dispatch(actions.loadingBot(true))
        setTimeout(() => {
            dispatch(actions.getResponseBot({ type: 'postcard', content: i.code }))
        }, 1000)
    }
    useEffect(() => {
        viewRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest' })
    }, [messages])
    return (
        <div className='p-2 pr-0 w-full h-full flex flex-col gap-2'>
            {!isStart && <div className='w-full h-full flex justify-around items-center flex-col'>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='text-[40px] font-bold text-blue-200 bg-blue-700 rounded-full w-[60px] h-[60px] flex items-center justify-center' >
                        P
                    </div>
                    <h2 className='text-lg font-medium'>PHUONGTHANH Shop</h2>
                    <small>Grocery store</small>
                </div>
                <button
                    type='button'
                    className='font-medium p-2 px-4 mb-5 bg-gray-700 rounded-[20px]'
                    onClick={() => handleSendMessage({ code: 'GET_STARTED', value: 'Bắt đầu' })}
                >
                    Bắt đầu
                </button>
            </div>}
            {isStart && <Scrollbars
                style={{ width: '100%', height: '100%' }}
                renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
            >
                <div className='w-full h-full flex flex-col gap-2 pt-[25px]' >
                    {messages.length > 0 && messages.map(message => {
                        return (
                            <Message
                                className={message?.className}
                                isBot={message?.isBot}
                                postcard={message.postcard}
                                text={message.text}
                                key={Math.random()}
                                list={message.list}
                                detail={message?.detail}
                            />
                        )
                    })}
                    {isLoadingBot && <BotLoading />}
                    <div ref={viewRef}></div>
                </div>
            </Scrollbars>}
        </div>
    )
}

export default memo(Messages)