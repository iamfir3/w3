const activeStyle = `border-[#4da801] text-[#4da801]`

const Voucher = ({ Vouchers, isFreeShip }) => {
  if (Vouchers && Vouchers.length > 0) {
    Vouchers.map((voucher) => (
      <div
        className="w-[328px] h-[75px] border-[1px] border-primary rounded-[8px]"
        key={voucher.id}
      >
        <div>
          <p></p>
        </div>
        <div></div>
      </div>
    ));
  } else {
    return (
      <div className={`w-full h-[75px] border-[1px] rounded-[8px] ${isFreeShip?activeStyle:'border-primary text-black'} flex items-center justify-center`}>
        <p className="lg:text-[14px] md:text-[12px] font-medium">Miễn phí ship tổng hóa đơn trên 500.000đ</p>
      </div>
    );
  }
};

export default Voucher;
