import React, { memo } from 'react'
import { ThreeCircles } from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = () => {
    return (
        <div className='md:w-full w-screen h-screen md:h-full w-screen h-screen flex justify-center items-center bg-overlay-30 fixed z-20'>
            <ThreeCircles
                height="100"
                width="100"
                color="#F25B69"
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="#C1EB59"
                innerCircleColor="#3B9D90"
                middleCircleColor="#F25B69"
            />
        </div>
    )
}

export default memo(Loading)