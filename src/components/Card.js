import icons from "../ultils/icons";
const { AiOutlineHeart } = icons;

const Card = ({
  name = "Túi Dior",
  shortDescription = "Christian dior",
  price = "2000000",
  prePrice = "3000000",
  sale = "50",
  image,
}) => {
  return (
    <>
      <div className="max-w-[160px] h-[235px]">
        <div className="h-[60%] w-[160px]">
          <img
            src={image}
            alt=""
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div className="h-[40%] p-1">
          <div className="font-semibold  flex justify-between items-center">
            <span>{name}</span>
          </div>
          <div className="flex justify-evenly items-center">
            <span className="font-bold mr-1 text-sm">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </span>
            <del className="text-xs inline-block h-[100%] mr-1">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(prePrice)}
            </del>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
