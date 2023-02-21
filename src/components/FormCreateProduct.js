import {
  InputCustomWidth,
  SelectCustomWidth,
  HashTagCustomWidth,
  TextCustomWidth,
  InputVariant,
} from "../components/InputCtWidth";
import Button from "./Button";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import icons from "../ultils/icons";
import { NotiStatus } from "../components/UploadStatus";
import ApiProduct from "../apis/product";
const { AiFillCheckCircle, BsUpload } = icons;
const FormCreateProduct = ({
  productName,
  setProductName,
  categories,
  selectValue,
  setSelectValue,
  price,
  setPrice,
  tags,
  setTags,
  setVariantChild,
  variantChild,
  setVariants,
  variants,
  image,
  setImage,
  variantValue,
  setVariantValue,
  handleSubmit,
  setShortDes,
  shortDes,
  showUpload,
  contentUpload,
  setShowUpload,
  setContentUpload,
  handleEdit,
}) => {
  const imageMainRef = useRef();
  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const editorRef = useRef();
  const [validatesForm, setValidatesForm] = useState([
    { name: "name", status: false },
    { name: "price", status: false },
    { name: "variant", status: false },
    { name: "image", status: false },
  ]);
  const setContentProduct = () => {
    if (editorRef.current) {
      const des = editorRef.current.getContent();
      setShortDes(des);
    }
  };

  const validateForm = () => {
    console.log(productName , price , image.imageMain , shortDes , selectValue);
    if (productName && price && image.imageMain && shortDes && selectValue) {
      console.log(productName , price , image.imageMain , shortDes , selectValue);
      return true;
    } else return false;
  };

  const handleImageMain = (e) => {
    setImage((prev) => ({
      ...prev,
      imageMain: URL.createObjectURL(e.target.files[0]),
    }));
  };
  const handleImage1 = (e) => {
    setImage((prev) => ({
      ...prev,
      image1: URL.createObjectURL(e.target.files[0]),
    }));
  };
  const handleImage2 = (e) => {
    setImage((prev) => ({
      ...prev,
      image2: URL.createObjectURL(e.target.files[0]),
    }));
  };
  const handleImage3 = (e) => {
    setImage((prev) => ({
      ...prev,
      image3: URL.createObjectURL(e.target.files[0]),
    }));
  };

  return (
    <div className="w-full items-center bg-[#d9d9d9] rounded justify-between p-5 relative">
      {showUpload && (
        <NotiStatus
          active={contentUpload.status === 0 ? "success" : "error"}
          setActive={setShowUpload}
          content={
            contentUpload.status === 0
              ? "Đã đăng ký sản phẩm thành công"
              : "Có lỗi xảy ra trong quá trình đăng ký"
          }
        />
      )}
      <h1 className="text-3xl text-center">Nhập thông tin tại đây</h1>
      <div className="h-[15%]">
        <InputCustomWidth
          required={!productName ? true : false}
          widthP={"full"}
          lable="Tên sản phẩm "
          placeholder="Tên sản phẩm..."
          PLarge={true}
          value={productName}
          setValue={setProductName}
          setValidatesForm={setValidatesForm}
          validateType={"name"}
        />
      </div>

      <div className="flex justify-between">
        <div className="flex w-[70%] h-full">
          <SelectCustomWidth
            widthP="[30%]"
            lable="Loại hàng"
            options={categories}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
          />
          <InputCustomWidth
            lable="Giá"
            required={!price ? true : false}
            placeholder="Giá: VND"
            PLarge={false}
            value={price}
            setValue={setPrice}
            setValidatesForm={setValidatesForm}
            validateType={"price"}
          />
        </div>

        <HashTagCustomWidth
          widthP="[30%]"
          lable="Hash_Tag"
          placeholder="Tag..."
          tags={tags}
          setTags={setTags}
        />
      </div>
      <div className="flex ">
        <div className=" w-1/2 pr-3">
          <div className="h-[350px]">
            <Editor
              apiKey="your-api-key"
              onInit={(evt, editor) => {
                return (editorRef.current = editor);
              }}
              initialValue={shortDes}
              init={{
                max_height: 300,
                width: "full",
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "charmap",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "insertdatetime",
                  "media",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | ",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <Button
              text="ADD CONTENT"
              bgColor="#4ed14b"
              textColor="#fff"
              width="100%"
              height={"2"}
              onClick={setContentProduct}
            ></Button>
            {shortDes && (
              <div className="border-primary border-2 mt-2 h-10 rounded-md bg-slate-50 flex justify-center items-center">
                <span className="">Đã cập nhật nội dung sản phẩm</span>
                <span className="text-[#4ed14b] ml-3">
                  <AiFillCheckCircle />
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 pl-3">
          <InputVariant
            setVariantChild={setVariantChild}
            setVariants={setVariants}
            variants={variants}
            variantChild={variantChild}
            variantValue={variantValue}
            setVariantValue={setVariantValue}
          />
          <div className="w-full flex flex-wrap">
            <div className="w-1/2">
              <label htmlFor="" className="font-bold">
                Ảnh chính
              </label>
              <div
                className="h-[200px] w-[200px] flex justify-center items-center bg-white rounded-md cursor-pointer hover:bg-slate-300"
                onClick={() => imageMainRef.current.click()}
              >
                {image.imageMain ? (
                  <img
                    src={image.imageMain}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <BsUpload fontSize="30px" />
                )}
              </div>

              <input
                className="hidden"
                type="file"
                name="imageMain"
                accept="image/*"
                ref={imageMainRef}
                onChange={handleImageMain}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="" className="font-bold">
                Ảnh 1
              </label>
              <div
                className="h-[200px] w-[200px]  flex justify-center items-center bg-white rounded-md cursor-pointer hover:bg-slate-300"
                onClick={() => image1Ref.current.click()}
              >

                {image.image1 ? (
                  <img
                    src={image.image1}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <BsUpload fontSize="30px" />
                )}
              </div>
              <input
                className="hidden"
                type="file"
                ref={image1Ref}
                name="image1"
                onChange={handleImage1}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="" className="font-bold">
                Ảnh 2
              </label>
              <div
                className="h-[200px] w-[200px]  flex justify-center items-center bg-white rounded-md cursor-pointer hover:bg-slate-300"
                onClick={() => image2Ref.current.click()}
              >
                {image.image2 ? (
                  <img
                    src={image.image2}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <BsUpload fontSize="30px" />
                )}
              </div>
              <input
                className="hidden"
                ref={image2Ref}
                type="file"
                name="image2"
                onChange={handleImage2}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="" className="font-bold">
                Ảnh 3
              </label>
              <div
                className="h-[200px] w-[200px]  flex justify-center items-center bg-white rounded-md cursor-pointer hover:bg-slate-300"
                onClick={() => image3Ref.current.click()}
              >
                {image.image3 ? (
                  <img
                    src={image.image3}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <BsUpload fontSize="30px" />
                )}
              </div>
              <input
                className="hidden"
                type="file"
                ref={image3Ref}
                name="image3"
                onChange={handleImage3}
              />
            </div>

            {/* <InputFileCustomWidth
                  lable="Ảnh 1"
                  widthP="[200%]"
                  valueImg={image1}
                  setValueImg={setImage1}
                />
                <InputFileCustomWidth
                  lable="Ảnh 2"
                  widthP="[100%]"
                  valueImg={image2}
                  setValueImg={setImage2}
                />
                <InputFileCustomWidth
                  lable="Ảnh 3"
                  widthP="[100%]"
                  valueImg={image3}
                  setValueImg={setImage3}
                />*/}
          </div>
        </div>
      </div>
      <div className="flex">
        <Button
          text="ADD PRODUCT"
          bgColor="#4ed14b"
          textColor="#fff"
          width="50%"
          height="2"
          onClick={() => {
            if (validateForm()) {
              
                 handleSubmit();
              // } else {
              //   return handleEdit();
              // }
            } else {
              console.log(selectValue);
              setShowUpload(true);
              setContentUpload({ status: 1 });
            }
          }}
        ></Button>
        <Button
          text="SEE PREVIEW"
          bgColor="#cf2b2b"
          textColor="#fff"
          width="50%"
          height="2"
        ></Button>
      </div>
    </div>
  );
};
export default FormCreateProduct;
