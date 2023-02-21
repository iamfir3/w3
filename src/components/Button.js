import React, { memo } from "react";

export const Button = ({
  text,
  bgColor,
  textColor,
  onClick,
  width,
  height,
  disabled,
}) => {
  return (
    <button
      type="button"
      className={` disabled:opacity-30 disabled:cursor-not-allowed bg-transparent hover:bg-primary-tint text-primary font-semibold hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded`}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: `${width}`,
        height: `${height}`,
        padding: `${height * 4}px 0`,
      }}
    >
      {text}
    </button>
  );
};

export const ButtonCtWidth = ({ content, color, width, height, onAction }) => {
  return (
    <button
      className={`text-base text-white 
        px-${width} py-${height} rounded-lg 
        hover:-translate-y-0.5 transition-all 
        ease-in-out active:translate-y-0.5 
        mr-[20px] bg-[${color}]`}
      onClick={() => onAction()}
    >
      {content}
    </button>
  );
};

export default memo(Button);
