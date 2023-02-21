const HistoryItem = ({ image, name, quantity, date, cost }) => {
    return (<div className="flex w-full p-[20px]">
        <div className='mr-[14px]'>
            <img src={image} alt='hi' className='rounded-[3px] w-[50px] h-[58px]'></img>
        </div>
        <div className='w-full flex flex-col justify-between'>
            <div className='flex justify-between'>
                <p className='font-medium text-[10px] text-[#404040] w-[90%]'>{name}</p>
                <p className='font-bold text-[12px] text-[#404040] border-[1px] rounded-[6px] px-[7px] pt-[6px] pb-[4px]'>{quantity}</p>
            </div>
            <div className='flex justify-between'>
                <p className='font-medium text-[9px] text-[#404040]'>{`Ngày đặt: ${date}`}</p>
                <p className='font-extrabold text-[10px] text-[#404040]'>{cost}</p>
            </div>
        </div>
    </div>);
}

export default HistoryItem; 