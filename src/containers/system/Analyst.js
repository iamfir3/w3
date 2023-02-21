import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import LinearProgress from "@mui/material/LinearProgress";
import icons from "../../ultils/icons";
import { useState } from "react";
import { LoadingPageDesktop } from "../../components/LoadingPage";
import { Pagination } from "@mui/material";
import ApiBill from "../../apis/bill";
import { useEffect } from "react";
import StatusTag from "../../components/StatusTag";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// abc
import dayjs from "dayjs";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Filler
);
const data1 = [22, 34, 2, 5, 24, 25, 32];
const data2 = [14, 24, 76, 45, 34, 66, 16];
const data3 = [4, 20, 42, 12, 52, 34, 12];
const { GiMoneyStack, BsCart3, FaUser } = icons;
const data = {
  labels: ["Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Chủ Nhật"],
  datasets: [
    {
      labels: "data3",
      data: data3,

      backgroundColor: "rgb(43%, 54%, 71%,0.8)",
    },
    {
      labels: "data1",
      data: data1,
      backgroundColor: "rgb(96%, 53%, 52%,0.8)",
    },
    {
      labels: "data2",
      data: data2,
      backgroundColor: "rgb(58%, 81%, 59%,0.8)",
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: true,
    },
  },
};

const sumData = (array) => {
  let s = 0;
  for (let i = 0; i < array.length; i++) {
    s += array[i];
  }
  return s;
};

function Analyst() {
  const [bills, setBills] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [date, setDate] = useState(dayjs("2022-04-07"));
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const renderBillsList = bills?.map((bill, i) => {
    const address = bill.addressData.address;
    return (
      <>
        <div
          key={bill?.id}
          className="flex items-center bg-white [&:not(:last-child)]:mb-[10px] w-full rounded-lg h-[102px] border-b-2"
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
            <StatusTag status={bill.status} />
          </div>
        </div>
      </>
    );
  });

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const res = await ApiBill.getAll();
        const bills = res.billData.rows;
        setBills((prev) => bills);
        setCount(res.billData.count);
      };
      fetchProducts();
    } catch (error) {}
  }, []);
  return (
    <div>
      <div className="flex justify-between pb-5">
        <div className="flex bg-white w-[30%] min-h-[120px] rounded-md shadow-md justify-center items-center">
          <div className="text-[60px]  w-1/4 text-center flex justify-center text-[#26CBA2]">
            <GiMoneyStack />
          </div>
          <div className="w-3/4">
            <p>
              {new Intl.NumberFormat("it-IT", {
                style: "currency",
                currency: "VND",
              }).format(200000)}
            </p>
            <p className="text-gray-400 text-sm">Doanh thu</p>
          </div>
        </div>
        <div className="flex bg-white w-[30%] min-h-[120px] rounded-md shadow-md justify-center items-center">
          <div className="text-[50px] w-1/4 text-center flex justify-center text-[#B194E6]">
            <BsCart3 />
          </div>
          <div className="w-3/4">
            <p>20</p>
            <p className="text-gray-400 text-sm">Số lượng đơn hàng</p>
          </div>
        </div>
        <div className="flex bg-white w-[30%] min-h-[120px] rounded-md shadow-md justify-center items-center">
          <div className="text-[50px] w-1/4 text-center flex justify-center text-[#F29A98]">
            <FaUser />
          </div>
          <div className="w-3/4">
            <p>200</p>
            <p className="text-gray-400 text-sm">Người dùng</p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md p-5 mb-5">
        <h1 className="font-bold">Biểu đồ phân tích</h1>
        <div className="flex rounded-md ">
          <div className="w-[65%] p-2 h-[400px]">
            <Bar options={options} data={data} width={1200} height={500} />
          </div>
          <div className="w-[35%]  px-10 flex flex-col justify-evenly">
            <div>
              <p className="font-semibold text-gray-500 pb-1">Người dùng :</p>
              <p className="text-xs pb-1">{`${sumData(data1)} người dùng`}</p>
              <LinearProgress
                variant="determinate"
                value={60}
                color="success"
                style={{ borderRadius: "5px", height: "7px" }}
              />
            </div>
            <div>
              <p className="font-semibold text-gray-500 pb-1">Số đơn hàng :</p>
              <p className="text-xs pb-1">{`${sumData(data2)} đơn hàng`}</p>
              <LinearProgress
                variant="determinate"
                value={60}
                color="error"
                style={{ borderRadius: "5px", height: "7px" }}
              />
            </div>
            <div>
              <p className="font-semibold text-gray-500 pb-1">Doanh thu :</p>
              <p className="text-xs pb-1">{`${sumData(
                data3
              )} lượt truy cập`}</p>
              <LinearProgress
                variant="determinate"
                value={60}
                style={{ borderRadius: "5px", height: "7px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex-auto flex flex-col h-[500px] bg-white rounded p-4 shadow-md">
          {/* <h1 className=text-3xl">Hóa Đơn</h1> */}

          <div className=" pt-[10px] pl-[10px] pr-[10px] mt-[20px] rounded-xl flex flex-col flex-auto">
            <div className="flex h-[50px] border-y-2 items-center text-gray-500 mb-2">
              <div className="w-[5%] flex justify-center font-bold">ID</div>
              <div className="w-[20%] flex justify-center font-bold">
                Tên người nhận
              </div>
              <div className="w-[20%] flex justify-center font-bold">
                Địa chỉ
              </div>
              <div className="w-[15%] flex justify-center font-bold">
                Số điện thoại
              </div>
              <div className="w-[20%] flex justify-center font-bold">
                Tổng hóa đơn
              </div>
              <div className="w-[20%] flex justify-center font-bold">
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
        <div className="w-fit bg-white ml-2 rounded-md shadow-md">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker
              date={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
}

export default Analyst;
