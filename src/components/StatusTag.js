const StatusTag = ({ status }) => {
  let content;
  if (status === "pending") {
    content = { colorBg: "bg-[#FB9678]", text: "ĐANG CHỜ", textColor: "text-white" };
  } else if (status === "shipping") {
    content = {
      colorBg: "bg-primary",
      text: "VẬN CHUYỂN",
      textColor: "text-white",
    };
  } else if (status === "completed") {
    content = {
      colorBg: "bg-[#00C292]",
      text: "THÀNH CÔNG",
      textColor: "text-white",
    };
  } else if (status === true) {
    content = {
      colorBg: "bg-[#00C292]",
      text: "Còn hàng",
      textColor: "text-white",
    };
  } else if (status === false) {
    content = {
      colorBg: "bg-rose-200",
      text: "Hết hàng",
      textColor: "text-rose-600",
    };
  } else {
    content = {
      colorBorder: "bg-rose-200",
      text: "ĐÃ HỦY",
      textColor: "text-rose-600",
    };
  }
  return (
    <div
      className={`${content.colorBg} ${content.colorBorder} ${content.textColor} w-[150px] h-full rounded-xl flex justify-center items-center px-3 py-2 `}
    >
      <span>{content.text}</span>
    </div>
  );
};
export default StatusTag;
