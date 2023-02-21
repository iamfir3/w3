import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PriceCaculator } from "../ultils/caculator";
import { numFormatter } from "../ultils/fn";
import { BiPlus, BiMinus } from "react-icons/bi";

const CartItem = ({
  product,
  variants,
  setQuanityList,
  quanityList,
  checkedList,
  setOpenAlertPopup,
  setIdDelete,
  isMobile,
  cartID,
  dataBill,
  setDataBill,
  setCheckedList,
}) => {
  const { id, name, mainImage, soldCounter,cid } = product || {};
  const [price, setPrice] = useState(0);
  const [quanityProduct, setQuanityProduct] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  let idUnique = null;

  const getIdUnique = () => {
    idUnique = id;
    variants.map((variant) => {
      idUnique += `--${variant.variant}-${variant.value}_${variant.price}`;
    });
  };
  getIdUnique();

  useEffect(() => setPrice(PriceCaculator(product, variants)), []);
  useEffect(() => {
    let varName = "";
    variants.map((variant) => {
      varName += `${variant.variant}: ${variant.value}. `;
    });
    let index = checkedList.indexOf(idUnique);
    let billData = {
      pid: id,
      qty: quanityProduct,
      cid:cartID,
      variant: varName,
      cost: price,
    };
    if (isChecked) {
      if (index !== -1) {
        quanityList.splice(index, 1, quanityProduct);
        let data = quanityList;
        setQuanityList([...data]);
        dataBill.splice(index, 1, billData);
        let tempData = dataBill;
        setDataBill([...tempData]);
      } else {
        setQuanityList((prev) => [...prev, quanityProduct]);
        setCheckedList((prev) => [...prev, idUnique]);
        setDataBill((prev) => [...prev, billData]);
      }
    } else if (!isChecked) {
      if (index !== -1) {
        quanityList.splice(index, 1);
        dataBill.splice(index, 1);
        setCheckedList((prev) => prev.filter((id) => id !== idUnique));
      }
    }
  }, [quanityProduct, isChecked]);

  return (
    <>
      {!isMobile && (
        <div key={idUnique} className="my-3 hidden md:block border-b-2">
          <div className="w-full flex h-[80px]">
            <div className=" w-[50%]">
              <div className="flex h-full ">
                <div className="w-[80px] mr-[12px]">
                  <img
                    src={mainImage}
                    alt=""
                    className="object-cover h-full rounded-[8px] "
                  />
                </div>

                <div className="p-2 flex flex-col justify-around gap-[8px]">
                  <Link
                    to={`/chi-tiet-san-pham/${id}`}
                    className=" font-medium lg:text-[16px] md:text-[14px] text-black"
                  >
                    {name}
                  </Link>
                  {/* <p className="text-xs">Đã bán: {soldCounter}</p> */}
                  <div className="inline">
                    {variants.map((variant, i) => {
                      let variantLength = variants.length;
                      return (
                        <div className="text-normal text-darkGrey lg:text-[16px] md:text-[14px]">
                          <span>
                            {variant.variant}: {variant.value}
                          </span>
                          <span>{i < variantLength - 1 ? ", " : ""}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-around md:w-[73px] border-[1px] border-primary rounded-[8px] items-center lg:text-[14px] font-normal md:text-[12px] text-black">
                    <BiMinus
                      onClick={() => {
                        if (quanityProduct > 1) {
                          setQuanityProduct((prev) => prev - 1);
                        }
                      }}
                    ></BiMinus>
                    <p>{quanityProduct}</p>
                    <BiPlus
                      onClick={() => {
                        setQuanityProduct((prev) => prev + 1);
                      }}
                    ></BiPlus>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[20%] text-center text-normal lg:text-[14px] md:text-[12px] text-black">
              {numFormatter(price)}
            </div>
            <div className="w-[15%] text-center text-normal lg:text-[14px] md:text-[12px] text-black">
              {quanityProduct}
            </div>
            <div className="w-[15%] text-center text-normal lg:text-[14px] md:text-[12px] text-black">
              {numFormatter(price * quanityProduct)}
            </div>
          </div>
          <div className="flex justify-end h-[20px] mb-2 font-bold">
            <div className="w-fit flex justify-between">
              <p className="text-primary border-b-[1px] font-semibold lg:text-[14px] md:text-[12px] border-b-primary pb-5 w-fit mr-2">
                <input
                  id={idUnique}
                  className="cursor-pointer"
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label className="cursor-pointer" htmlFor={idUnique}>
                  Chọn
                </label>
              </p>
              <p className="text-primary border-b-[1px] border-b-primary font-semibold lg:text-[14px] md:text-[12px] ml-[24px] pb-5 w-fit mr-2 cursor-pointer">
                Yêu thích
              </p>
              <p
                onClick={() => {
                  setIdDelete(cartID);
                  setOpenAlertPopup(true);
                }}
                className=" text-red border-b-[1px] ml-[24px] font-semibold lg:text-[14px] md:text-[12px] border-red pb-5 w-fit cursor-pointer"
              >
                Xóa
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CartItem;
