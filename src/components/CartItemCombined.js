import { numFormatter } from '../ultils/fn';

const CartItemCombined = ({data}) => {
    const {mainImage,name,quanity,price,variant} = data

  return (
    <div className="w-full flex lg:my-[40px] md:my-[30px] my-[20px]">
      <div className="h-full flex flex-1">
        <div>
        <img src={mainImage} alt="mainImage" className="object-cover lg:h-[80px] lg:w-[75px] h-[56px] w-[56px] rounded-[8px]" />
        </div>

        <div className='ml-[16px]'>
        <p className=" font-medium lg:text-[16px] md:text-[14px] text-[12px]">{name}</p>
        <p className="lg:text-[16px] md:text-[14px] text-[12px]   font-normal">{variant}</p>
        <p className='lg:text-[16px] md:text-[14px]  text-[12px] font-normal'>Số lượng: {quanity}</p>
        </div> 
      </div>
      <div className='text-right flex-2 lg:text-[16px] md:text-[14px] text-[12px]'>{numFormatter(price*quanity)}</div>
    </div>
  );
};
export default CartItemCombined;
