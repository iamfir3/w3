const ButtonFooterContainer = ({ children }) => {
  return (
    <div className="fixed bottom-0 bg-white w-full h-[66px] flex items-center">
      <div className="h-[44px] flex w-full justify-around">{children}</div>
    </div>
  );
};

export default ButtonFooterContainer;
