import { Button } from "../../components/Button";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import {
  InputCustomWidth,
  SelectCustomWidth,
} from "../../components/InputCtWidth";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { PopupDeleteProduct, EditProduct } from "../../components/Modal";
import { filters } from "../../ultils/constant";
import Pagination from "@mui/material/Pagination";
import { NotiStatus } from "../../components/UploadStatus";
import { LoadingPageDesktop } from "../../components/LoadingPage";
import ItemProduct from "../../components/ItemProduct";
const ManageProduct = ({setSelectProductEdit}) => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => {
    return state.app;
  });
  const { products, count } = useSelector((state) => {
    return state.products;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [addDeletes, setAddDeletes] = useState([]);
  const [selectedDelete, setSelectedDelete] = useState();
  const [selectProduct, setSelectProduct] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [selectFilter, setSelectFilter] = useState(filters[0]);
  const [page, setPage] = useState(1);
  const [showUpload, setShowUpload] = useState(false);
  const [contentUpload, setContentUpload] = useState();
  const [search, setSearch] = useState("");
  const [showOption, setShowOption] = useState(false);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // reload products theo category
  useEffect(() => {
    categories.length > 0 && setSelectValue(categories[0].code);
  }, [categories]);

  useEffect(() => {
    setAddDeletes([]);
  }, [selectValue]);

  useEffect(() => {
    const filter = Object.values(selectFilter.sort);
    selectValue &&
      !isLoading &&
      dispatch(
        actions.getProducts({
          categoryCode: selectValue,
          order: [...filter],
          limitProduct: 7,
          page: page,
          name: search,
        })
      );
  }, [selectValue, isLoading, selectFilter, page, search]);

  // Compontent products

  const renderProductList = products?.map((product, i) => {
    return (
      <ItemProduct
        product={product}
        setAddDeletes={setAddDeletes}
        addDeletes={addDeletes}
        showOption={showOption}
        setShowOption={setShowOption}
        selectProduct={selectProduct}
        setSelectProduct={setSelectProduct}
        setIsDelete={setIsDelete}
        setSelectedDelete={setSelectedDelete}
        setIsShowEdit={setIsShowEdit}
        isDelete={isDelete}
        setSelectProductEdit={setSelectProductEdit}
      />
    );
  });
  return (
    <>
      <div className="w-full flex flex-col h-full bg-white rounded p-4">
        <div className="flex items-center rounded p-3 justify-between ">
          {showUpload && (
            <NotiStatus
              active={contentUpload?.status === 0 ? "success" : "error"}
              setActive={setShowUpload}
              content={
                contentUpload?.status === 0
                  ? "Xóa sản phẩm thành công"
                  : "Có lỗi xảy ra trong quá trình xử lí"
              }
            />
          )}
          <div className="w-[30%] pl-[30px] flex items-center justify-around text-xl ">
            <div className="font-bold ">
              <p> Đã chọn: {addDeletes.length}</p>
            </div>
            <Button
              text="Xóa sản phẩm"
              bgColor="#cf2b2b"
              textColor="#fff"
              width="40%"
              disabled={addDeletes.length <= 0}
              height="2"
              onClick={() => {
                setIsDelete(!isDelete);
              }}
            ></Button>
          </div>
          <div className="flex w-[50%] ">
            <div className=" w-[40%] flex items-center">
              <InputCustomWidth
                placeholder="Tìm kiếm...."
                value={search}
                setValue={setSearch}
                widthP="full"
              />
            </div>
            <div className="flex items-center w-[30%] ">
              <SelectCustomWidth
                label="Loc"
                widthP="full"
                options={filters}
                selectValue={selectFilter}
                setSelectValue={setSelectFilter}
              />
            </div>
            <div className="flex items-center w-[30%] ">
              <SelectCustomWidth
                label="Loại hàng"
                widthP="full"
                options={categories}
                selectValue={selectValue}
                setSelectValue={setSelectValue}
              />
            </div>
          </div>
        </div>

        <div className=" pt-[10px] pl-[10px] pr-[10px] mt-[20px] rounded-xl flex flex-col flex-auto">
          <div className="flex h-[50px] border-y-2 items-center text-gray-500 mb-2">
            <div className="w-[10%] flex justify-center font-bold text-2xl"></div>
            <div className="w-[20%] flex justify-center font-bold text-xl">
              Hình ảnh
            </div>
            <div className="w-[20%] flex justify-center font-bold text-xl">
              Tên sản phẩm
            </div>
            <div className="w-[15%]  font-bold text-xl">Loại hàng</div>
            <div className="w-[10%] flex justify-center font-bold text-xl">
              Trạng thái
            </div>
            <div className="w-[10%] flex justify-center font-bold text-xl">
              Giá
            </div>
          </div>
          <div className="h-[90%]  overflow-auto relative scroll-smooth">
            {loading ? <LoadingPageDesktop /> : renderProductList}
          </div>
          <div className="flex justify-center w-full min-h-[50px] flex-auto p-2 relative">
            <div className="absolute bottom-0">
              <Pagination
                count={Math.ceil(count / 7)}
                color="primary"
                size="large"
                page={page}
                onChange={handleChangePage}
              />
            </div>
          </div>
        </div>
        {isDelete ? (
          <PopupDeleteProduct
            setIsDelete={setIsDelete}
            isDelete={isDelete}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            products={addDeletes}
            selectValue={selectValue}
            setAddDeletes={setAddDeletes}
            product={selectedDelete}
            setProduct={setSelectedDelete}
            contentUpload={contentUpload}
            showUpload={showUpload}
            setShowUpload={setShowUpload}
            setContentUpload={setContentUpload}
          />
        ) : (
          ""
        )}
        {isShowEdit ? (
          <EditProduct
            isShowEdit={isShowEdit}
            setIsShowEdit={setIsShowEdit}
            product={selectProduct}
            categories={categories}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            category={selectValue}
            setShowUpload={setShowUpload}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ManageProduct;
