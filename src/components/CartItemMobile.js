import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PriceCaculator } from "../ultils/caculator";
import { numFormatter } from "../ultils/fn";
import { BiPlus, BiMinus } from "react-icons/bi";

const CartItemMobile = ({
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
  const { id, name, mainImage } = product || {};
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
      variant: varName,
      cost: price,
      cid: cartID,
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
      {/*Mobile*/}
      {isMobile && (
        <div className="w-full md:hidden bg-white h-[170px] mb-2 rounded-xl mt-2 px-2 pt-2">
          <div className="flex h-[120px] items-center">
            <input
              id={idUnique + "-mobile"}
              className="cursor-pointer mr-[8px]"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <div className="flex">
              <img
                src={mainImage}
                alt="ProductImage"
                className="object-cover w-[96px] h-[96px] rounded-[8px]"
              />
              <div className="px-2 flex flex-col justify-around">
                <b className="text-[12px] font-semibold text-black">{name}</b>
                <p>
                  {variants.map((variant, i) => {
                    let variantLength = variants.length;
                    return (
                      <div className="text-[12px] font-medium text-darkGrey">
                        <span>
                          {variant.variant}: {variant.value}
                        </span>
                        <span>{i < variantLength - 1 ? ", " : ""}</span>
                      </div>
                    );
                  })}
                </p>
                <div className="flex justify-around md:w-[73px] border-[1px] border-primary rounded-[8px] items-center lg:text-[14px] font-normal md:text-[12px] text-black px-[5px] py-[3px]">
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
                {/* <div className="flex bg-lightGrey p-1 w-fit items-center rounded-sm mt-[7px] mb-[9px]">
                   <div className="flex justify-center items-center">
                    <span className="text-[12px]">Số lượng :</span>
                  </div>
                  <select
                    onChange={(e) => setQuanityProduct(e.target.value)}
                    className="bg-lightGrey font-bold  text-[12px] rounded-[4px]"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select> 
                   
                  

                </div> */}
                <div className="text-black font-semibold text-[14px]">
                  <label htmlFor="">{`Giá : `}</label>
                  <span className="font-bold">
                    {numFormatter(price * quanityProduct)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-[40px] border-t-[1px] font-semibold text-[14px] text-primary">
            <div className="border-r-[1px] w-1/2 flex justify-center items-center my-[6px]">
              <span>Yêu thích</span>
            </div>
            <div
              onClick={() => {
                setIdDelete(cartID);
                setOpenAlertPopup(true);
              }}
              className="w-1/2 flex justify-center items-center "
            >
              <span>Xóa</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CartItemMobile;
