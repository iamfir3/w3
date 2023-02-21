import React, { useCallback, useState, useEffect } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import Button from "./Button";
import icons from "../ultils/icons";
// import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai";

const { AiOutlineClose, AiFillEye, AiFillEyeInvisible } = icons;
const InputCustomWidth = React.memo(
  ({
    lable,
    widthP,
    placeholder,
    PLarge,
    value,
    setValue,
    type,
    required,
    setValidatesForm,
    validateType,
  }) => {
    const [checkRequired, setCheckRequired] = useState(
      required === true ? true : ""
    );
    useEffect(() => {
      setValidatesForm &&
        setValidatesForm((prev) => {
          let array = [...prev];
          array.map((item) => {
            if (item.name === validateType) {
              item.status = !checkRequired;
            }
          });
          return [...prev];
        });
    }, [checkRequired]);
    return (
      <div className={`w-${widthP}  h-full`}>
        <label
          htmlFor="field"
          className={`font-bold text-l ${
            lable ? "min-h-[42px]" : ""
          } flex items-center`}
        >
          {lable}
        </label>

        <input
          className={` outline-none block w-full bg-lightGrey ${
            checkRequired === true && "border-[1px] border-rose-500"
          }  ${PLarge ? "pl-7 pr-12" : " px-7"} sm:text-sm 
                rounded-md  ${lable ? "min-h-[42px]" : "h-full"}
                 `}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            if (!type) {
              return setValue(e.target.value);
            } else {
              setValue((prev) => ({
                ...prev,
                [type]: e.target.value,
              }));
            }
          }}
          onBlur={(e) => {
            if (checkRequired !== "") {
              if (e.target.value.length > 0) {
                return setCheckRequired(false);
              } else {
                return setCheckRequired(true);
              }
            }
          }}
        />
      </div>
    );
  }
);

/* Select field Which can custom width
    WidthP : value of width
    @Anhtd
*/
const SelectCustomWidth = React.memo(
  ({ options, lable, widthP, selectValue, setSelectValue, onChange }) => {
    return (
      <div className={`w-${widthP} h-full`}>
        <label
          htmlFor="field"
          className={`font-bold text-l ${
            lable ? "min-h-[42px]" : ""
          }  flex items-center`}
        >
          {lable}
        </label>
        <div
          className={`flex items-center w-full ${lable ? "h-1/2" : "h-full"}`}
        >
          <select
            className="mr-3  focus:ring-indigo-500 
                focus:border-indigo-500 block w-full pl-2 pr-2 sm:text-sm 
                border-gray-300 rounded-md min-h-[42px]"
            onChange={(e) => {
              if (options[0]?.sort) {
                onChange && onChange(null);
                setSelectValue(JSON.parse(e.target.value));
              } else {
                setSelectValue(e.target.value);
                onChange && onChange(null);
              }
            }}
          >
            {options?.length !== 0 ? (
              options?.map((option, index) => {
                return (
                  <option
                    key={option?.code ? option?.code : option?.valueVi}
                    value={option?.code ? option?.code : JSON.stringify(option)}
                    selected={
                      JSON.stringify(option) === JSON.stringify(selectValue) ||
                      selectValue === option.code
                    }
                  >
                    {option?.valueVi}
                  </option>
                );
              })
            ) : (
              <option value="null">Chưa có lựa chọn</option>
            )}
          </select>
          <BiSortAlt2 className="text-2xl" />
        </div>
      </div>
    );
  }
);

/* Select address field Which can custom width
    WidthP : value of width
    @ducanh
*/
const SelectPayment = React.memo(
  ({ options, lable, widthP, selectValue, setSelectValue, type }) => {
    let defaultContent = "";
    switch (type) {
      case "ProvinceName":
        defaultContent = "Chọn tỉnh thành ...";
        break;
      case "DistrictName":
        defaultContent = "Chọn quận huyện ...";
        break;
      case "WardName":
        defaultContent = "Chọn xã phường ...";
        break;
      default:
        defaultContent = "DEFAULT";
        break;
    }

    return (
      <div className={`w-${widthP} h-full`}>
        <label
          htmlFor="field"
          className={`font-bold text-l ${
            lable ? "min-h-[42px]" : ""
          }  flex items-center`}
        >
          {lable}
        </label>
        <div
          className={`flex items-center w-full ${lable ? "h-1/2" : "h-full"}`}
        >
          <select
            className="mr-3  focus:ring-indigo-500 
                focus:border-indigo-500 block w-full pl-2 pr-2 sm:text-sm 
                border-gray-300 rounded-md min-h-[42px]"
            onChange={(e) => {
              setSelectValue(JSON.parse(e.target.value));
            }}
            defaultValue={selectValue}
          >
            <option value="DEFAULT" selected={selectValue === "DEFAULT"}>
              {defaultContent}
            </option>
            {options?.length !== 0 ? (
              options?.map((option, index) => {
                return (
                  <option
                    value={JSON.stringify(option)}
                    selected={selectValue === option}
                  >
                    {option[type]}
                  </option>
                );
              })
            ) : (
              <option value="null">Chưa có lựa chọn</option>
            )}
          </select>
          {/* <BiSortAlt2 className="text-2xl" /> */}
        </div>
      </div>
    );
  }
);

/* HashTag field Which can custom width
    WidthP : value of width
    @Anhtd
*/
const HashTagCustomWidth = React.memo(
  ({ lable, widthP, placeholder, tags, setTags }) => {
    const [value, setValue] = useState("");
    const onAction = useCallback((newValue) => {
      setValue(newValue);
    }, []);
    const handleAction = () => {
      if (value === "") return;
      let newHashTag = `${value.replace(/ /g, "_")}`;
      setTags([...tags, newHashTag]);
      setValue("");
    };
    const handleKeyCode = (e) => {
      if (e.keyCode === 13) handleAction();
    };
    return (
      <div className={`w-${widthP} h-full`}>
        <label
          htmlFor="field"
          className={`font-bold text-l ${
            lable ? "min-h-[42px]" : ""
          }  flex items-center`}
        >
          {lable}
        </label>
        <div className="flex h-[30%] mb-2">
          <input
            className="focus:ring-indigo-500 
                focus:border-indigo-500 block 
                w-full pl-2 pr-2 sm:text-sm 
                border-gray-300 rounded-md
                min-h-[42px] mr-[12px]"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onAction(e.target.value)}
            onKeyDown={(e) => handleKeyCode(e)}
          />
          <Button
            text="Them"
            bgColor="#4ed14b"
            textColor="#fff"
            width="40%"
            onClick={handleAction}
          ></Button>
        </div>
        <div className="flex flex-wrap">
          {tags?.length !== 0 ? (
            tags?.map((tag, index) => {
              return (
                <div className="text-sm flex items-center justify-between outline outline-primary outline-1 bg-white px-2 py-2 rounded-lg min-w-[50px] mr-2">
                  {tag}
                  <AiOutlineClose
                    onClick={() =>
                      setTags((prev) =>
                        [...prev].filter((item) => item !== tag)
                      )
                    }
                  />
                </div>
              );
            })
          ) : (
            <div className="text-sm items-center outline outline-primary outline-1 bg-white px-2 py-1 rounded-lg">
              #hash_tag_here
            </div>
          )}
        </div>
      </div>
    );
  }
);

/* Text field Which can custom width
    WidthP : value of width
    PLarge : large or small padding
    @Anhtd
*/
const TextCustomWidth = React.memo(({ lable, widthP, placeholder }) => {
  const [value, setValue] = useState("");
  const onAction = useCallback((newvalue) => setValue(newvalue), []);
  return (
    <div className={`w-${widthP}`}>
      <label
        htmlFor="field"
        className={`font-bold text-l ${
          lable ? "min-h-[42px]" : ""
        }  flex items-center`}
      >
        {lable}
      </label>
      <textarea
        className="mr-3  h-[80px] focus:ring-indigo-500 
                focus:border-indigo-500 block w-full pl-2 pr-2 sm:text-sm 
                border-gray-300 rounded-md "
        value={value}
        placeholder={placeholder}
        onChange={(e) => onAction(e.target.value)}
      />
    </div>
  );
});

/* Input files field Which can custom width
    WidthP : value of width
    PLarge : large or small padding
    @Anhtd
*/
const InputFileCustomWidth = React.memo(
  ({ lable, widthP, setValueImg, valueImg }) => {
    const onAction = useCallback((e) => {
      setValueImg(e.target.files[0]);
    }, []);
    return (
      <div className={`w-${widthP} my-3`}>
        <label htmlFor="field" className="font-bold text-l">
          {lable}
        </label>
        <input
          type="file"
          className="mr-3  h-full focus:ring-indigo-500 
                focus:border-indigo-500 block w-full pl-2 pr-2 sm:text-sm 
                border-gray-300 rounded-md"
          onChange={onAction}
          // value={valueImg}
        />
      </div>
    );
  }
);

const InputVariant = ({
  setVariantChild,
  setVariants,
  variants,
  variantChild,
  variantValue,
  setVariantValue,
}) => {
  return (
    <div className={`w-full`}>
      <div className="h-[50%] flex">
        <InputCustomWidth
          widthP="[60%]"
          lable="Tùy chọn sản phẩm"
          placeholder="vd: size,màu..."
          PLarge={false}
          value={variantValue?.name}
          setValue={setVariantValue}
          type="name"
        />
        <div className="w-[30%] ml-5">
          <div className="h-1/2"></div>

          <Button
            width="100%"
            text="Add Variant"
            bgColor="#4ed14b"
            textColor="#fff"
            height="2"
            disabled={variantValue?.value.length > 0 ? false : true}
            onClick={() => {
              if (variantValue.value.length > 0) {
                setVariants((prev) => [...prev, variantValue]);
                setVariantValue({ name: "", value: [] });
                setVariantChild({ type: "", price: "" });
              } else {
                console.log(variantChild.type !== "");
                console.log(variantChild.price !== "");
                console.log(variantValue.name !== "");
              }
            }}
          ></Button>
        </div>
      </div>
      <div className="flex justify-between ">
        <InputCustomWidth
          widthP="[30%]"
          lable="Phân loại "
          placeholder="vd: m,l,xl..."
          PLarge={false}
          value={variantChild?.type}
          setValue={setVariantChild}
          type="type"
        />
        <InputCustomWidth
          widthP="[30%]"
          lable="Price"
          placeholder="Giá: VND"
          PLarge={false}
          value={variantChild?.price}
          setValue={setVariantChild}
          type="price"
        />
        <div className=" w-[30%]">
          <div className="h-1/2"></div>
          <Button
            width="100%"
            text="Add"
            bgColor="#4ed14b"
            textColor="#fff"
            height="2"
            disabled={
              Number.isInteger(Number(variantChild?.price)) &
              (variantChild?.type !== "") &
              (variantChild?.price !== "") &
              (variantValue?.name !== "")
                ? false
                : true
            }
            onClick={() => {
              if (
                Number.isInteger(Number(variantChild.price)) &
                (variantChild?.type !== "") &
                (variantChild?.price !== "") &
                (variantValue?.name !== "")
              ) {
                setVariantValue((prev) => {
                  const type = "value";
                  return { ...prev, [type]: [...prev?.value, variantChild] };
                });
                setVariantChild({ type: "", price: "" });
              }
            }}
          ></Button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {variants &&
          variants?.map((variant, index) => (
            <div
              className="flex outline outline-primary outline-1 bg-white px-3 py-3 rounded-lg my-2 h-full min-w-[350px]  relative"
              key={index}
            >
              <div
                className="font-bold absolute top-0 left-[94%] cursor-pointer"
                onClick={() =>
                  setVariants((prev) =>
                    [...prev].filter((item, i) => i !== index)
                  )
                }
              >
                <AiOutlineClose />
              </div>
              <b className=" ">{`${variant?.name} : `}</b>
              <div className="">
                {variant?.value?.map((type, index) => {
                  const cost = Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "VND",
                  }).format(type.price);

                  return (
                    <>
                      <div className="w-full flex pl-2">
                        <div className=" min-w-[100px]">{`Loại : ${type.type}`}</div>
                        <div className="min-w-[100px]">{`Giá :  ${cost}`}</div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

// Input search
const InputSearch = React.memo(
  ({ placeholder, value, setValue, isSearching, setIsSearching }) => {
    const onAction = useCallback((newvalue) => setValue(newvalue), []);
    if (value !== "") setIsSearching(true);
    else setIsSearching(false);
    return (
      <>
        <div className={`h-full w-[84%]`}>
          <input
            className="h-full w-full bg-[#d9d9d9] pl-[18px] focus:outline-none rounded-l-[12px]"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onAction(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        {isSearching && (
          <div className="absolute bg-[#000] z-30 top-[60px] right-[60px] rounded-[24px] opacity-[0.7]  w-[560px] text-white">
            <div className="w-[80%] mx-auto my-[16px] border-b-[2px]">
              This this a test case of searching...
            </div>
            <div className="w-[80%] mx-auto my-[12px] border-b-[2px]">
              This this a test case of searching...
            </div>
            <div className="w-[80%] mx-auto my-[12px] border-b-[2px]">
              This this a test case of searching...
            </div>
            <div className="w-[80%] mx-auto my-[12px] border-b-[2px]">
              This this a test case of searching...
            </div>
            <div className="w-[80%] mx-auto my-[12px] border-b-[2px]">
              This this a test case of searching...
            </div>
            <div className="w-[80%] mx-auto my-[12px] border-b-[2px]">
              This this a test case of searching...
            </div>
          </div>
        )}
      </>
    );
  }
);

const InputFieldWithValidate = React.memo(
  ({ lable, value, setValue, type, message, setMessage }) => {
    return (
      <div className={`w-full  h-full mb-[24px]`}>
        <label
          htmlFor="field"
          className={`font-bold text-l flex items-center text-primary`}
        >
          {lable}
        </label>

        <input
          type={type}
          className={`bg-[#F1F1F1] rounded-[8px] w-full h-[42px] px-[8px]`}
          value={value}
          required
          onChange={(e) => {
            setMessage(null);
            setValue(e.target.value);
          }}
        />
        <div
          className={`${
            message ? "visible" : "invisible"
          }text-sm text-highlight`}
        >
          {message}
        </div>
      </div>
    );
  }
);
const InputFieldWithValidatePassword = React.memo(
  ({ lable, value, setValue, message, setMessage }) => {
    const [isPassword, setIsPassword] = useState(true)
    const handleClick = ()=> {
      setIsPassword(!isPassword)
    }
    return (
      <div className={`w-full relative h-full mb-[24px]`}>
        <div onClick={() => handleClick()} className="absolute select-none top-[34px] cursor-pointer right-[18px]">
          {isPassword?<AiFillEye size={24} color="#325d76" />: <AiFillEyeInvisible size={24} color="#325d76" />}
        </div>
        <label
          htmlFor="field"
          className={`font-bold text-l flex items-center text-primary`}
        >
          {lable}
        </label>

        <input
          type={isPassword?'password':'text'}
          className={`bg-[#F1F1F1] rounded-[8px] w-full h-[42px] px-[8px]`}
          value={value}
          required
          onChange={(e) => {
            setMessage(null);
            setValue(e.target.value);
          }}
        />
        <div
          className={`${
            message ? "visible" : "invisible"
          }text-sm text-highlight`}
        >
          {message}
        </div>
      </div>
    );
  }
);

export {
  InputCustomWidth,
  SelectCustomWidth,
  HashTagCustomWidth,
  TextCustomWidth,
  InputFileCustomWidth,
  InputSearch,
  InputVariant,
  InputFieldWithValidate,
  InputFieldWithValidatePassword,
  SelectPayment,
};
// setVariantValue((prev)=>({
//     ...prev,

//     value: prev.value.some((item=>item.type==='X')?prev.value.filter(item=>item.type!=='X'):[...prev.value,{type: 'X'}]
// }))
