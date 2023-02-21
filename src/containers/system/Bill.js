import React from "react";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import ApiBill from "../../apis/bill";
import {
  InputCustomWidth,
  SelectCustomWidth,
} from "../../components/InputCtWidth";
import { Profile } from "../../components/Modal";
import Button from "../../components/Button";
import { NotiStatus } from "../../components/UploadStatus";
import { filtersBill, statusFilter } from "../../ultils/constant";
import { Pagination } from "@mui/material";
import { LoadingPageDesktop } from "../../components/LoadingPage";
const Bill = () => {
  const [bills, setBills] = useState([]);
  const [options, setOptions] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [contentUpload, setContentUpload] = useState();
  const [isShow, setIsShow] = useState(false);
  const [selectedBill, setSelectedBill] = useState({});
  const [selectFilter, setSelectFilter] = useState(filtersBill[0]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [valueInput, setValueInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(statusFilter[0].code);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const filter = Object.values(selectFilter.sort);
        let payload = {
          order: [...filter],
          limit: 7,
          page: page,
        };
        if (selectedStatus === "") {
          payload = {
            order: [...filter],
            limit: 7,
            page: page,
          };
        } else {
          payload = {
            order: [...filter],
            limit: 7,
            page: page,
            status: selectedStatus,
          };
        }
        const res = await ApiBill.getAll(payload);
        const bills = res.billData.rows;
        setBills((prev) => bills);
        setCount(res.billData.count);
      };
      fetchProducts();
    } catch (error) {}
  }, [contentUpload, selectFilter, selectedStatus]);

  const renderBillsList = bills?.map((bill, i) => {
    const address = bill.addressData.address;
    return (
      <>
        <div
          key={bill?.id}
          className="flex items-center bg-white [&:not(:last-child)]:mb-[10px] w-full rounded-lg h-[102px] border-b-2 text-xl "
        >
          <div className="w-[5%] flex justify-center">{i + 1}</div>

          <div className="w-[20%] flex justify-center">
            <p>{bill?.addressData?.name}</p>
          </div>
          <div className="w-[20%] flex justify-center">
            <p>{`${address?.province} - ${address?.district} - ${address?.ward}`}</p>
          </div>
          <div className="w-[15%] flex justify-center">
            <p>{bill?.addressData?.phone}</p>
          </div>
          <div className="flex w-[20%] justify-around ">
            {new Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "VND",
            }).format(bill?.totalCost)}
          </div>
          <div className="w-[20%] flex justify-center">
            <Button
              text="Xem chi tiet"
              bgColor="#4ed14b"
              textColor="#fff"
              width="80%"
              height="3"
              onClick={() => {
                
                setSelectedBill(bill);
                setIsShow(true);
              }}
            ></Button>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      {isShow && (
        <Profile
          isShow={isShow}
          setIsShow={setIsShow}
          billCurrent={selectedBill}
          showUpload={showUpload}
          setShowUpload={setShowUpload}
          setContentUpload={setContentUpload}
          contentUpload={contentUpload}
        />
      )}

      

      <div className="w-full flex flex-col h-full bg-white rounded p-4">
      {/* <h1 className="text-3xl">Hóa Đơn</h1> */}
      
      <div className="flex items-center rounded p-3 justify-between ">
          {showUpload && (
            <NotiStatus
            active={contentUpload?.status === 0 ? "success" : "error"}
            setActive={setShowUpload}
            content={
              contentUpload?.status === 0
                ? "Thay đổi trạng thái đơn hàng thành công"
                : "Có lỗi xảy ra trong quá trình xử lí"
            }
          />
          )}
          <div className="w-[30%] pl-[30px] flex items-center justify-around text-xl ">
      
          </div>
          <div className="flex w-[50%] ">
            <div className=" w-[40%] flex items-center">
            </div>
            <div className="flex items-center w-[30%] ">
            <SelectCustomWidth
              widthP="full"
              options={filtersBill}
              selectValue={selectFilter}
              setSelectValue={setSelectFilter}
              onChange={setBills}
            />
            </div>
            <div className="flex items-center w-[30%] ">
            <SelectCustomWidth
              widthP="full"
              options={statusFilter}
              selectValue={selectedStatus}
              setSelectValue={setSelectedStatus}
              onChange={setBills}
            />
            </div>
          </div>
        </div>



        <div className=" pt-[10px] pl-[10px] pr-[10px] mt-[20px] rounded-xl flex flex-col flex-auto">
          <div className="flex h-[50px] border-y-2 items-center text-gray-500 mb-2">
            <div className="w-[5%] flex justify-center font-bold text-2xl">
            ID
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Tên người nhận
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Địa chỉ
          </div>
          <div className="w-[15%] flex justify-center font-bold text-xl">
            Số điện thoại
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Tổng hóa đơn
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Trạng thái
          </div>
          </div>
          <div className="h-[90%]  overflow-auto relative scroll-smooth">
            {bills === null ? <LoadingPageDesktop /> : renderBillsList}
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
        
      </div>
        
      {/* <div className="flex items-center bg-[#d9d9d9] rounded justify-between p-5 ">
        {showUpload && (
          <NotiStatus
            active={contentUpload?.status === 0 ? "success" : "error"}
            setActive={setShowUpload}
            content={
              contentUpload?.status === 0
                ? "Thay đổi trạng thái đơn hàng thành công"
                : "Có lỗi xảy ra trong quá trình xử lí"
            }
          />
        )}
        <div className="flex justify-between w-full h-[40px]">
          <div className="w-[30%] ">
            <SelectCustomWidth
              widthP="full"
              options={filtersBill}
              selectValue={selectFilter}
              setSelectValue={setSelectFilter}
              onChange={setBills}
            />
          </div>
          <div className="w-[30%] ">
            <SelectCustomWidth
              widthP="full"
              options={statusFilter}
              selectValue={selectedStatus}
              setSelectValue={setSelectedStatus}
              onChange={setBills}
            />
          </div>
        </div>
      </div>

      <div className="bg-[#d9d9d9] pt-[10px] pl-[10px] pr-[10px] mt-[20px] rounded-xl  h-[600px] flex flex-col">
        <div className="flex h-[50px] pr-[20px]">
          <div className="w-[5%] flex justify-center font-bold text-2xl">
            ID
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Tên người nhận
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Địa chỉ
          </div>
          <div className="w-[15%] flex justify-center font-bold text-xl">
            Số điện thoại
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Tổng hóa đơn
          </div>
          <div className="w-[20%] flex justify-center font-bold text-xl">
            Trạng thái
          </div>
        </div>
        <div className="h-4/5 overflow-auto relative">
          {bills === null ? <LoadingPageDesktop /> : renderBillsList}
        </div>
        <div className="flex justify-center w-full flex-auto items-end p-2">
          <Pagination
            count={Math.ceil(count / 7)}
            color="primary"
            size="large"
            page={page}
            onChange={handleChangePage}
          />
        </div>
      </div> */}
    </>
  );
};

export default Bill;
