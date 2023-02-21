import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Slider = () => {

    const { categories } = useSelector(state => state.app)
    useEffect(() => {
        const sliderItems = document.getElementsByClassName('slider-item')
        let chosen = 1
        const intervalId = setInterval(() => {
            for (let i = 0; i < sliderItems.length; i++) {
                if (i === chosen) {
                    sliderItems[i].style.cssText = `display: flex`
                } else {
                    sliderItems[i].style.cssText = `display: none`
                }
            }
            chosen = chosen >= (sliderItems.length - 1) ? 0 : chosen + 1
        }, 3500)
        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, [])

    return (
        <div className='relative overflow-hidden bg-white md:h-[414px] md:h-[300px] h-[150px] rounded-lg md:mx-5 mx-4'>
            <div className='w-full h-full'></div>
            {categories?.map((item, index) => (
                <Link
                    key={item.id}
                    to={`/`}
                    className={`slider-item rounded-lg absolute items-start justify-center animate-slide-right ${index === 1 ? 'flex' : 'hidden'} top-0 left-0 right-0 bottom-0 h-full`}
                >
                    <img src={item.image} className='w-full md:h-[400px] h-[120px] rounded-lg object-cover' alt="slider" />
                </Link>
            ))}

        </div>
    )
}

export default memo(Slider)