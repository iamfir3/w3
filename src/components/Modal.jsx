import {
  InputCustomWidth,
  SelectCustomWidth,
  HashTagCustomWidth,
  TextCustomWidth,
} from "./InputCtWidth";
import Button from "./Button";
import icons from "../ultils/icons";
import { useState, useEffect, useRef } from "react";
import ApiCategory from "../apis/category";
import ApiProduct from "../apis/product";
import * as actions from "../../src/store/actions";
import { useDispatch } from "react-redux";
import avatar from "../assets/avatar-anon.png";
import { filters } from "../ultils/constant";
import { Slider } from "@mui/material";
import { apiGetProductsOfBill2 } from "../apis/bill2";
import StatusTag from "./StatusTag";
import StepperBill from "./StepperBill";
import { NotiStatus } from "./UploadStatus";
import React from "react";
import FormCreateProduct from "./FormCreateProduct";
import { bufferToBase64 } from "../ultils/common";
import apiUSer from "../apis/user";

const { BsUpload } = icons;
export const ModalEditCate = ({
  setIsShowEdit,
  selectCate,
  setShowUpload,
  showUpload,
  setContentUpload,
  setIsLoading,
}) => {
  const [newCategory, setNewCategory] = useState(`${selectCate.valueVi}`);
  const [color, setColor] = useState(`${selectCate.color}`);
  const [image, setImage] = useState(selectCate.image);
  const [imageUrl, setImageUrl] = useState(selectCate.image);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const Submit = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("valueVi", newCategory);
    bodyFormData.append("id", selectCate.id);
    bodyFormData.append("color", color);
    bodyFormData.append("image", image);
    try {
      setIsShowEdit(false);
      setIsLoading(true);
      const res = await ApiCategory.update(bodyFormData);
      setContentUpload(res);
      if (res.status === 0) {
        dispatch(actions.getCategory());
        setIsLoading(false);
        setShowUpload(!showUpload);
      } else {
        setIsLoading(false);
        setShowUpload(!showUpload);
      }
    } catch (error) {
      console.log(error);
      setIsShowEdit(false);
      setIsLoading(false);
      setShowUpload(!showUpload);
    }
  };
  useEffect(() => {
    if (typeof image !== "string") {
      image && setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);
  return (
    <div
      className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg"
      onClick={(e) => {
        e.stopPropagation();
        setIsShowEdit(false);
      }}
    >
      <div
        className=" w-[1000px] h-[500px] bg-slate-100 rounded p-10 z-10 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-center h-[10%] text-xl">
          <b>GIAN HÀNG</b>
        </div>

        <div className="h-[70%] flex justify-evenly p-3">
          <div className="flex flex-col ">
            <div className=" ">
              <InputCustomWidth
                widthP="full"
                value={newCategory}
                setValue={setNewCategory}
                placeholder="vd : Mỹ phẩm ,.."
                lable="Tên gian hàng mới"
              ></InputCustomWidth>
            </div>
            <div className=" h-[15%]">
              <InputCustomWidth
                widthP="full"
                value={color}
                setValue={setColor}
                placeholder="vd : #333333"
                lable="Mã màu gian hàng mới"
              ></InputCustomWidth>
            </div>
          </div>
          <div className="text-center h-full">
            <h1 className="h-[42px] font-bold">ẢNH BÌA CHO GIAN HÀNG</h1>
            <input
              className="hidden"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              ref={imageRef}
            />
            <div
              className="w-[500px] h-5/6 flex justify-center items-center bg-white rounded-md cursor-pointer hover:bg-slate-300"
              onClick={() => imageRef.current.click()}
            >
              {imageUrl ? (
                <img
                  src={imageUrl || avatar}
                  alt=""
                  className="object-cover w-full h-full "
                />
              ) : (
                <span>
                  <BsUpload fontSize="50px" />
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="h-[10%] justify-center flex ">
          <Button
            text="SỬA GIAN HÀNG"
            bgColor="#4ed14b"
            textColor="#fff"
            width="80%"
            onClick={() => {
              Submit();
              setIsShowEdit(false);
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};
export const ModalCreateCate = ({
  setIsShowCreate,
  setShowUpload,
  showUpload,
  setContentUpload,
  setIsLoading,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const imageRef = useRef();
  const dispatch = useDispatch();
  const onSubmit = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("valueVi", newCategory);
    bodyFormData.append("color", color);
    bodyFormData.append("image", image);
    try {
      setIsShowCreate(false);
      setIsLoading(true);
      const res = await ApiCategory.create(bodyFormData);
      setContentUpload(res);
      if (res.status === 0) {
        dispatch(actions.getCategory());
        setIsLoading(false);
        setShowUpload(!showUpload);
      } else {
        setIsLoading(false);
        setShowUpload(!showUpload);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsShowCreate(false);
      setShowUpload(!showUpload);
    }
  };
  useEffect(() => {
    if (typeof image !== "string") {
      image && setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);

  return (
    <div
      className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg"
      onClick={(e) => {
        e.stopPropagation();
        setIsShowCreate(false);
      }}
    >
      <div
        className=" w-[1000px] h-[500px] bg-slate-100 rounded p-10 z-10 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-center h-[10%] text-xl">
          <b>THÊM GIAN HÀNG</b>
        </div>

        <div className="h-[70%] flex justify-evenly p-3">
          <div className="flex flex-col ">
            <div className=" ">
              <InputCustomWidth
                widthP="full"
                value={newCategory}
                setValue={setNewCategory}
                placeholder="vd : Mỹ phẩm ,.."
                lable="Tên gian hàng mới"
              ></InputCustomWidth>
            </div>
            <div className=" h-[15%]">
              <InputCustomWidth
                widthP="full"
                value={color}
                setValue={setColor}
                placeholder="vd : #333333"
                lable="Mã màu gian hàng mới"
              ></InputCustomWidth>
            </div>
          </div>
          <div className="text-center h-full">
            <h1 className="h-[42px] font-bold">ẢNH BÌA CHO GIAN HÀNG MỚI</h1>
            <input
              className="hidden"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              ref={imageRef}
            />
            <div
              className="w-[500px] h-5/6 flex justify-center items-center bg-white rounded-md cursor-pointer hover:bg-slate-300"
              onClick={() => imageRef.current.click()}
            >
              {imageUrl ? (
                <img
                  src={imageUrl || avatar}
                  alt=""
                  className="object-cover w-full h-full "
                />
              ) : (
                <span>
                  <BsUpload fontSize="50px" />
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="h-[10%] justify-center flex ">
          <Button
            text="THÊM GIAN HÀNG"
            bgColor="#4ed14b"
            textColor="#fff"
            width="80%"
            onClick={() => {
              onSubmit();
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export const PopupDeleteCate = ({
  setIsDelete,
  selectCate,
  setShowUpload,
  showUpload,
  setContentUpload,
  isLoading,
  setIsLoading,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg"
      onClick={(e) => {
        setIsDelete(false);
        e.stopPropagation();
      }}
    >
      <div
        className=" w-[500px] bg-white rounded p-10 flex flex-col  items-center z-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <b>BẠN CHẮC MUỐN XÓA GIAN HÀNG NÀY CHỨ </b>
        <Button
          text="XÓA GIAN HÀNG"
          bgColor="#4ed14b"
          textColor="#fff"
          width="100%"
          height="3"
          onClick={async () => {
            try {
              setIsDelete(false);
              setIsLoading(true);
              const res = await ApiCategory.delete({ id: [selectCate.id] });
              setContentUpload(res);
              if (res.status === 0) {
                dispatch(actions.getCategory());
                setIsLoading(false);
                setShowUpload(!showUpload);
              } else {
                setIsLoading(false);
                setShowUpload(!showUpload);
              }
            } catch (error) {
              console.log(error);
              setIsLoading(false);
              setIsDelete(false);
              setShowUpload(!showUpload);
            }
          }}
        ></Button>
      </div>
    </div>
  );
};
export const PopupDeleteUser = ({
  user,
  setIsDelete,
  setShowUpload,
  showUpload,
  setContentUpload,
  isLoading,
  setIsLoading,
}) => {
  return (
    <div
      className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg"
      onClick={(e) => {
        setIsDelete(false);
        e.stopPropagation();
      }}
    >
      <div
        className=" w-[500px] bg-white rounded p-10 flex flex-col  items-center z-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <b>BẠN CHẮC MUỐN XÓA GIAN HÀNG NÀY CHỨ </b>
        <Button
          text="XÓA NGƯỜI DÙNG"
          bgColor="#4ed14b"
          textColor="#fff"
          width="100%"
          height="3"
          onClick={async () => {
            try {
              setIsDelete(false);
              setIsLoading(true);
              const res = await apiUSer.delete({ id: user.id });
              setContentUpload(res);
              if (res.status === 0) {
                setIsLoading(false);
                setShowUpload(!showUpload);
              } else {
                setIsLoading(false);
                setShowUpload(!showUpload);
              }
            } catch (error) {
              console.log(error);
              setIsLoading(false);
              setIsDelete(false);
              setShowUpload(!showUpload);
            }
          }}
        ></Button>
      </div>
    </div>
  );
};

export const PopupDeleteProduct = ({
  setIsDelete,
  setIsLoading,
  isLoading,
  isDelete,
  products,
  setAddDeletes,
  product,
  setProduct,
  contentUpload,
  showUpload,
  setShowUpload,
  setContentUpload,
}) => {
  return (
    <div
      className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg"
      onClick={(e) => {
        setIsDelete(false);
        e.stopPropagation();
      }}
    >
      <div
        className=" w-[500px] bg-white rounded p-10 flex flex-col  items-center z-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <b>BẠN CHẮC MUỐN XÓA SẢN PHẨM NÀY CHỨ </b>
        <Button
          text="XÓA"
          bgColor="#4ed14b"
          textColor="#fff"
          width="40%"
          height="2"
          onClick={async () => {
            try {
              setIsLoading(true);
              setIsDelete(false);
              if (product) {
                const res = await ApiProduct.delete({ id: [product] });
                setContentUpload(res);
                if (res.status === 0) {
                  setProduct();
                  setAddDeletes((prev) =>
                    ![...prev].some((item) => item === product)
                      ? [...prev]
                      : [...prev].filter((item) => item !== product)
                  );

                  setShowUpload(true);

                  setIsLoading(false);
                }
              } else {
                const res = await ApiProduct.delete({ id: [...products] });
                if (res.status === 0) {
                  setShowUpload(true);
                  setIsLoading(false);
                  setAddDeletes([]);
                }
              }
            } catch (error) {
              setAddDeletes([]);
              setIsDelete(false);
              setShowUpload(true);
              setIsLoading(!isLoading);
            }
          }}
        ></Button>
      </div>
    </div>
  );
};

export const EditProduct = ({
  setIsShowEdit,
  setIsLoading,
  isLoading,
  categories,
  product,
  category,
  setContentUpload,
  setShowUpload,
}) => {
  console.log(product);
  const dispatch = useDispatch();
  const [productName, setProductName] = useState(product.name);
  const [selectValue, setSelectValue] = useState(category);
  const [price, setPrice] = useState(product.costPerUnit);
  const [tags, setTags] = useState(
    product.hashtags !== null ? JSON.parse(product.hashtags) : []
  );
  const [shortDes, setShortDes] = useState(product.description);
  const [image, setImage] = useState({
    imageMain: product.mainImage,
    image1: product.image1,
    image2: product.image2,
    image3: product.image3,
  });
  const [imageUrl, setImageUrl] = useState({
    imageMainUrl: product.mainImage,
    image1Url: product.image1,
    image2Url: product.image2,
    image3Url: product.image3,
  });
  const [variants, setVariants] = useState(product.variants);
  const [variantValue, setVariantValue] = useState({ name: "", value: [] });
  const [variantChild, setVariantChild] = useState({ type: "", price: "" });
  useEffect(() => {
    if (typeof image.imageMain !== "string")
      setImageUrl((prev) => ({
        ...prev,
        imageMainUrl: URL.createObjectURL(image.imageMain),
      }));
    if (typeof image.image1 !== "string")
      setImageUrl((prev) => ({
        ...prev,
        image1Url: URL.createObjectURL(image.image1),
      }));
    if (typeof image.image2 !== "string")
      setImageUrl((prev) => ({
        ...prev,
        image2Url: URL.createObjectURL(image.image2),
      }));
    if (typeof image.image3 !== "string")
      setImageUrl((prev) => ({
        ...prev,
        image3Url: URL.createObjectURL(image.image3),
      }));
  }, [image]);

  const handleEdit = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("mainImage", image.imageMain);
    bodyFormData.append("image1", image.image1);
    bodyFormData.append("image2", image.image2);
    bodyFormData.append("image3", image.image3);
    bodyFormData.append("name", productName);
    bodyFormData.append("costPerUnit", price);
    bodyFormData.append("description", shortDes);
    bodyFormData.append("categoryCode", selectValue);
    bodyFormData.append("variants", JSON.stringify(variants));
    bodyFormData.append("tags", JSON.stringify(tags));
    bodyFormData.append("id", product.id);
    try {
      setIsShowEdit(false);
      setIsLoading(true);
      const res = await ApiProduct.update(bodyFormData);
      if (res.status === 0) {
        setShowUpload(true);
      } else {
        setShowUpload(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsShowEdit(false);
      setShowUpload(true);
    }
  };
  return (
    <>
      <div
        className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg overflow-auto"
        onClick={(e) => {
          setIsShowEdit(false);
          e.stopPropagation();
        }}
      >
        <div
          className=" w-[1000px]  rounded  flex flex-col  items-center z-10 overflow-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FormCreateProduct
            productName={productName}
            setProductName={setProductName}
            categories={categories}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            price={price}
            setPrice={setPrice}
            tags={tags}
            setTags={setTags}
            variantValue={variantValue}
            setVariantValue={setVariantValue}
            setVariantChild={setVariantChild}
            variantChild={variantChild}
            setVariants={setVariants}
            variants={variants}
            image={image}
            shortDes={shortDes}
            setImage={setImage}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            id={product.id}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
};
export const Profile = ({
  billCurrent,
  setIsShow,
  setShowUpload,
  showUpload,
  setContentUpload,
  contentUpload,
}) => {
  const steps = ["pending", "shipping", "completed", "cancel"];
  const [productsBill, setProductBill] = useState(billCurrent.log[0]);
  const numActive = steps.findIndex((item) => billCurrent?.status === item);
  const [activeStep, setActiveStep] = useState(numActive);
  const addressBill = (billCurrent?.addressData.address);
  const address = `${addressBill?.province}`;
  return (
    <>
      <div
        className="fixed h-full w-full top-0 right-0 flex justify-center items-center bg-gray-500/[.09] drop-shadow-lg z-10"
        onClick={(e) => {
          e.stopPropagation();
          setIsShow(false);
        }}
      >
        <div
          className=" w-4/5 rounded flex items-center z-10"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-1/2 items-center bg-white rounded justify-center flex p-5 h-[680px] ">
            <div className="rounded bg-gray-200 w-[90%] h-1/2 p-3">
              <h1 className="text-xl bold text-center mb-5">
                THÔNG TIN ĐƠN HÀNG
              </h1>
              <div className="mb-5 h-1/2 flex items-center">
                <div className="h-[100px]">
                  <img
                    src={
                      bufferToBase64(billCurrent?.avatar) ||
                      billCurrent?.avatarUrl ||
                      avatar
                    }
                    alt=""
                    className="h-full rounded-full pr-3"
                  />
                </div>

                <div className="w-fit px-5`">
                  {/* <div className="">
                    <b className="">Tên người dùng : </b>
                    {billCurrent?.name ? billCurrent?.name : ""}
                  </div> */}
                  <div className="flex">
                    <p className="">
                      <b>Tên người mua : </b>
                      {billCurrent?.addressData?.name
                        ? billCurrent?.addressData?.name
                        : ""}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="">
                      <b>Số điện thoại : </b>
                      {billCurrent?.addressData?.phone
                        ? billCurrent?.addressData?.phone
                        : ""}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="">
                      <b>Địa chỉ : </b>
                      {address}
                    </p>
                  </div>
                </div>
              </div>
              <StepperBill
                active={activeStep}
                setActive={setActiveStep}
                billCur={billCurrent}
                showUpload={showUpload}
                setShowUpload={setShowUpload}
                setContentUpload={setContentUpload}
                setIsShow={setIsShow}
              />
            </div>
          </div>
          <div className="w-1/2 items-center bg-[#d9d9d9] rounded  flex-col flex p-5 h-[680px] ">
            <div className="w-4/5 bg-white h-full rounded">
              <div className="h-[15%] flex items-center justify-center">
                <b>ĐƠN HÀNG</b>
              </div>
              <hr />

              <div className="h-[85%] overflow-auto relative">
                {productsBill?.products?.map((product) => {
                  return (
                    <div className="h-[25%] flex m-3 border-b-2">
                      <div className="w-[80%] flex h-full ">
                        <div className="w-1/3 ">
                          <img
                            src={product.mainImage
                            }
                            alt=""
                            className="object-cover h-full w-full rounded-xl"
                          />
                        </div>

                        <div className="flex flex-auto flex-col justify-between pl-5">
                          <b className="text-sm">{product?.name}</b>
                          <p className="text-xs">Ngày đặt: 12/08/2022</p>
                        </div>
                      </div>
                      <div className="w-[20%] flex flex-col justify-between">
                        <div className="flex justify-end">
                          <div className="border rounded px-3 py-1 text-center text">
                            {product?.qty}
                          </div>
                        </div>

                        <div className="text-sm">
                          <b>
                            {new Intl.NumberFormat("it-IT", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.cost)}
                          </b>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="absolute bottom-0 h-[70px] z-200 bg-gray-200 w-full flex  justify-between p-3">
                  {/* Trang thai don hang */}

                  <StatusTag status={billCurrent.status} />
                  {/* Gia ship , Total */}
                  <div className="">
                    <div className="flex flex-col items-end justify-between">
                      <div className="border-2 border-b-gray-400 ">
                        <div className=" text-right">
                          <span>Giá vận chuyển :</span>
                          <span>
                            {new Intl.NumberFormat("it-IT", {
                              style: "currency",
                              currency: "VND",
                            }).format(billCurrent?.shipPrice)}
                          </span>
                        </div>
                      </div>
                      <div className="">
                        <div className="font-bold">
                          <span>Tổng hóa đơn : </span>
                          <span>
                            {new Intl.NumberFormat("it-IT", {
                              style: "currency",
                              currency: "VND",
                            }).format(billCurrent?.totalCost)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const FilterProductsMobile = ({
  setSelectedFilter,
  selectedFilter,
  setIsShow,
  handleChange2,
  value,
  numFormatter,
  handleChange,
  setSelectedFilterSider,
  filtersSider,
  selectedFilterSider,
}) => {
  return (
    <>
      <div
        className="fixed h-full w-full top-0 right-0 bg-gray-500/[.09] drop-shadow-lg z-10"
        onClick={(e) => {
          e.stopPropagation();
          setIsShow(false);
        }}
      >
        <div
          className="h-[40%] w-full absolute bottom-0 bg-white rounded-t-3xl"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className="h-[15%] text-base flex justify-center items-center
          "
          >
            <span>Lọc theo</span>
          </div>
          <hr />
          <div className="flex flex-col justify-around h-[85%] px-5">
            {filters.map((filter, i) => {
              const value = JSON.stringify(filter);
              return (
                <div className="" key={filter.valueVi}>
                  <input
                    id={`option-sort--${i}`}
                    type="radio"
                    value={value}
                    onChange={(e) => {
                      setSelectedFilter(JSON.parse(e.target?.value));
                    }}
                    checked={JSON.stringify(selectedFilter) === value}
                  />
                  <label className="ml-5" htmlFor={`option-sort--${i}`}>
                    {filter.valueVi}
                  </label>
                </div>
              );
            })}
            {filtersSider?.map((filter) => (
              <div className="flex">
                <input
                  type="checkbox"
                  checked={
                    selectedFilterSider.some((item) => item.valueVi) ? 1 : 0
                  }
                  value={JSON.stringify(filter)}
                  className=""
                  onClick={() => {
                    setSelectedFilterSider((prev) => {
                      return prev.some(
                        (item) => item.valueVi === filter.valueVi
                      )
                        ? prev.filter((item) => item.valueVi !== filter.valueVi)
                        : [...prev, filter];
                    });
                  }}
                />
                <label htmlFor="" className="ml-5">
                  {filter.valueVi}
                </label>
              </div>
            ))}
            <Slider
              getAriaLabel={() => "Minimum distance shift"}
              value={value}
              onChange={handleChange}
              onChangeCommitted={handleChange2}
              valueLabelDisplay="on"
              step={100000}
              marks
              disableSwap
              max={1500000}
              valueLabelFormat={(value) => <div>{numFormatter(value)}</div>}
            />
          </div>
        </div>
      </div>
    </>
  );
};
