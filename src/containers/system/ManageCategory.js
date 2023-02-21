import { Button } from "../../components/Button";
import ApiCategory from "../../apis/category";
import { useEffect, useState } from "react";
import { InputCustomWidth } from "../../components/InputCtWidth";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import FormData from "form-data";
import {
  ModalEditCate,
  PopupDeleteCate,
  ModalCreateCate,
} from "../../components/Modal";
import { NotiStatus } from "../../components/UploadStatus";
import { LoadingPageDesktop } from "../../components/LoadingPage";
const ManageCategory = () => {
  const [selectCate, setSelectCate] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [contentUpload, setContentUpload] = useState();
  const categories = useSelector((state) => {
    return state.app.categories;
  });

  const renderCateList = categories.map((cate, i) => {
    return (
      <div
        key={cate.id}
        className="flex items-center bg-white [&:not(:last-child)]:mb-[10px] w-full rounded-lg h-[100px]  text-xl "
      >
        <div className="flex items-center w-full justify-between">
          <div className="w-[28%] p-10">
            <p className=" text-xl font-bold ">{cate.valueVi}</p>
          </div>

          <div className="w-[30%] flex justify-around">
            <Button
              text="Sửa"
              bgColor="#4ed14b"
              textColor="#fff"
              width="40%"
              onClick={() => {
                setIsShowEdit(!isShowEdit);
                setSelectCate(cate);
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
                setSelectCate(cate);
              }}
            ></Button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <h1 className="text-2xl mb-2">ManageCategory</h1>
      <div className="bg-gray-300 rounded p-5 h-[600px] overflow-auto">
        {showUpload && (
          <NotiStatus
            active={contentUpload?.status === 0 ? "success" : "error"}
            setActive={setShowUpload}
            content={
              contentUpload?.status === 0
                ? contentUpload.message
                : "Có lỗi xảy ra trong quá trình xử lí"
            }
          />
        )}
        <div className="">
          <div className="flex">
            <Button
              text="THÊM GIAN HÀNG"
              bgColor="#4ed14b"
              textColor="#fff"
              width="40%"
              height="3"
              onClick={() => {
                setIsShowCreate(!isDelete);
              }}
            ></Button>
          </div>
          <h2 className="p-3 font-bold">{`Tổng số gian hàng hiện có : ${categories.length}`}</h2>
        </div>

        <div className="overflow-auto h-[400px] relative">
          {isLoading ? <LoadingPageDesktop /> : renderCateList}
        </div>
      </div>
      {isShowEdit ? (
        <ModalEditCate
          setIsShowEdit={setIsShowEdit}
          selectCate={selectCate}
          setShowUpload={setShowUpload}
          setContentUpload={setContentUpload}
          showUpload={showUpload}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        ""
      )}
      {isDelete ? (
        <PopupDeleteCate
          setIsDelete={setIsDelete}
          selectCate={selectCate}
          isDelete={isDelete}
          setShowUpload={setShowUpload}
          showUpload={showUpload}
          setContentUpload={setContentUpload}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        ""
      )}
      {isShowCreate ? (
        <ModalCreateCate
          setIsShowCreate={setIsShowCreate}
          setShowUpload={setShowUpload}
          showUpload={showUpload}
          setContentUpload={setContentUpload}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ManageCategory;
