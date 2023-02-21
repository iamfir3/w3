import React, { memo } from "react";

const Button2 = ({ text, style, icBefore, icAfter, handleClick, disable }) => {
  return (
    <button
      onClick={() => handleClick()}
      type="button"
      disabled={disable}
      className={`outline-none flex items-center w-full lg:text-[16px] md:text-[14px] justify-center gap-2 rounded-md py-2 opacity-90 hover:opacity-100 ${
        style || "px-4 text-white bg-primary"
      }`}
    >
      {icBefore}
      <span>{text}</span>
      {icAfter}
    </button>
  );
};

export default memo(Button2);
