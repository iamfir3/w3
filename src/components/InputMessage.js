import React, { useState } from 'react'
import { MdSend } from 'react-icons/md'
import { FiMenu } from 'react-icons/fi'
import * as actions from '../store/actions'
import { useDispatch } from 'react-redux'
const InputMessage = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const [isShowModal, setIsShowModal] = useState(false)
    const handleSubmit = async () => {
        dispatch(actions.addTextUser({ value: text }))
        // dispatch(actions.loadingBot(true))
        dispatch(actions.getResponseBot({ type: 'message', content: text }))
        setText('')
    }
    const handleRedirect = () => {
        window.open('https://www.youtube.com/channel/UCAYuiip9dDTBBq6Ox-SIGUA', '_blank')
        setIsShowModal(false)
    }
    const handleKeyUp = (e) => {
        e.stopPropagation()
        if (e.code === 'Enter') handleSubmit()

    }
    return (
        <div className='input-message h-full border-t border-gray-500 flex items-center justify-end p-1 pl-2 gap-2' >
            <textarea
                className='w-9/12 rounded-md h-4/5 text-white bg-gray-600 outline-none p-2'
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={handleKeyUp}
            >
            </textarea>
            <div className='flex items-center justify-end gap-4 w-3/12 relative'>
                <button
                    type='button'
                    className='flex items-center justify-center hover:text-blue-600'
                    onClick={handleSubmit}
                    title='Gửi tin nhắn'
                >
                    <MdSend size={24} />
                </button>
                <button
                    type='button'
                    className='flex items-center justify-center hover:text-blue-600'
                    onClick={() => setIsShowModal(prev => !prev)}
                    title='Tùy chọn'
                >
                    <FiMenu size={24} />
                </button>
                {isShowModal && <div className='absolute z-50 bottom-0 right-[30px] bg-gray-700'>
                    <div
                        className='py-2 px-4 hover:bg-gray-500 cursor-pointer text-white font-medium whitespace-nowrap'
                        onClick={() => {
                            dispatch(actions.addTextUser({ value: 'Bắt đầu lại cuộc hội thoại' }))
                            dispatch(actions.getResponseBot({ type: 'postcard', content: 'GET_STARTED' }))
                            setIsShowModal(false)
                        }}
                    >
                        Bắt đầu lại cuộc hội thoại
                    </div>
                    <div onClick={handleRedirect} className='py-2 px-4 hover:bg-gray-500 cursor-pointer text-white font-medium whitespace-nowrap'>
                        Đến channel hip06
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default InputMessage