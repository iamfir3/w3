const LongButton=({children,width,height,backgroundColor,color,size,disabled,handleClick,position})=>{
    return <button 
    className={`flex leading-6 font-semibold rounded-[8px] items-center justify-center ${disabled?'opacity-60':'opacity-100'} 
    ${position?position:''} `} 
    style={{width:width,height:height,fontSize:size,color:color,backgroundColor:backgroundColor}}
    disabled={disabled}
    onClick={handleClick}>
        {children}
    </button>
}

export default LongButton;