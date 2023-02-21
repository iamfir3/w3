import React, { useState, memo } from "react";
import InputMessage from "./InputMessage";
import Messages from "./Messages";
import icons from "../ultils/icons";

const { AiOutlineClose } = icons;

const BoxChat = ({ setIsStartChatBot,show,setShow }) => {
  const [isStart, setIsStart] = useState(false);
  return (
    <div className="w-full h-[80%] md:w-[328px] md:h-[455px] bg-gray-800 text-gray-200">
      <div className="w-full h-[48px] bg-gray-900 flex justify-between items-center px-2 font-medium">
        <span>Bot v2</span>
        <span
          onClick={() => {
            setIsStartChatBot(false);
            if(window.innerWidth < 768)setShow((prev) => !prev);
          }}
          className="cursor-pointer hover:text-orange-600"
        >
          <AiOutlineClose size={24} />
        </span>
      </div>
      <div className="flex flex-col h-[407px] ">
        <div className="content flex-auto w-full h-[300px] relative">
          <Messages isStart={isStart} setIsStart={setIsStart} />
          <div className="absolute bottom-0 bg-gray-800 h-[25px] w-full"></div>
        </div>
        {isStart && (
          <div className="flex-auto w-full h-[10px]">
            <InputMessage />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(BoxChat);
