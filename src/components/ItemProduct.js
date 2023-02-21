import { useState } from "react";
import {useNavigate } from "react-router-dom";
import icons from "../ultils/icons";
import StatusTag from "./StatusTag";

const { FiMoreHorizontal, AiOutlineClose } = icons;

const ItemProduct = ({
  product,
  setAddDeletes,
  addDeletes,
  showOption,
  setShowOption,
  selectProduct,
  setSelectProduct,
  setIsDelete,
  setSelectedDelete,
  setIsShowEdit,
  isDelete,
  setSelectProductEdit
}) => {
  const navigate=useNavigate();
  return (
    <div
      key={product.id}
      className={`flex items-center bg-white w-full h-[120px]  text-xl border-b-2 ${
        addDeletes.some((item) => item === product.id) && "bg-slate-200"
      }`}
    >
      <div className="w-[10%] flex justify-center">
        <input
          type="checkbox"
          className="h-[17.5px] w-[17.5px]"
          value={product.id}
          onClick={(e) => {
            setAddDeletes((prev) =>
              ![...prev].some((item) => item === e.target.value)
                ? [...prev, e.target.value]
                : [...prev].filter((item) => item !== e.target.value)
            );
          }}
          checked={addDeletes.some((item) => product.id === item)}
        ></input>
      </div>
      <div className=" w-[20%] flex justify-center h-4/5">
        <img
          src={product.mainImage}
          alt=""
          className="object-contain w-[70%]"
        ></img>
      </div>
      <div className="w-[20%] flex justify-center ">
        <div className="w-full text-center">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis p-3">
            {product.name}
          </p>
        </div>
      </div>
      <div className="w-[15%] gap-3 overflow-hidden">
        {/* {product?.variants.map((item) => (
            <div
              key={item.name}
              className="flex justify-center outline-black
                p-2 rounded-xl  w-[40%] hover:outline-primary outline-2 outline hover:outline-4 "
            >
              <span>{item.name}</span>
            </div>
          ))} */}
        <div className="">{product?.variants.length}</div>
        <div className="">{`Tùy chọn : ${product?.variants.map(
          (item) => item.name
        )}`}</div>
      </div>
      <div className="w-[10%] flex justify-center">
        <StatusTag status={product.inStocking} />
      </div>
      <div className="w-[15%] flex justify-center">
        <p>
          {new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "VND",
          }).format(product?.costPerUnit)}
        </p>
      </div>
      <div className="flex w-[10%] justify-around ">
        <div
          className="bg-gray-300 p-3 rounded-md relative hover:bg-gray-500 cursor-pointer"
          onClick={() => {
            if (selectProduct !== product) {
              setSelectProduct(product);
            }
          }}
        >
          {selectProduct.id === product.id ? (
            <AiOutlineClose onClick={() => setSelectProduct({})} />
          ) : (
            <FiMoreHorizontal />
          )}

          {selectProduct.id === product.id && (
            <div className="absolute z-50 left-0 top-12 rounded h-[100px] w-[100px] bg-slate-100 text-center">
              <div
                className="h-1/2 w-full flex items-center justify-center cursor-pointer hover:bg-slate-400 hover:text-white"
                onClick={() => {

                  setSelectProductEdit(product);
                  navigate('/system/manage-product/edit-product');
                }}
              >
                <span>Sửa</span>
              </div>
              <div
                className="h-1/2 w-full flex items-center justify-center cursor-pointer hover:bg-slate-400 hover:text-white
              "
                onClick={() => {
                  setIsDelete(!isDelete);
                  setSelectedDelete(product.id);
                }}
              >
                <span>Xóa</span>
              </div>
            </div>
          )}
        </div>

        {/* <Button
            text="Sửa"
            bgColor="#4ed14b"
            textColor="#fff"
            width="40%"
            onClick={() => {
              setIsShowEdit(true);
              setSelectProduct(product);
            }}
          ></Button>

          <Button
            text="Xóa"
            bgColor="#cf2b2b"
            textColor="#fff"
            width="40%"
            height="2"
            onClick={() => {
              setIsDelete(!isDelete);
              setSelectedDelete(product.id);
            }}
          ></Button> */}
      </div>
    </div>
  );
};
export default ItemProduct;
