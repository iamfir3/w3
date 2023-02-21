import { MdClose } from "react-icons/md";
import ButtonFooterContainer from "./ButtonFooterContainer";
import LongButton from "./LongButton";
import { useRef, memo, useState } from "react";
import ApiComment from "../apis/comment";
import { Upload } from "./UploadStatus";

const CreateComponentPopup = ({
  setShowPopupComment,
  id,
  showPopupComment,
  fetchComments,
}) => {
  const [status, setStatus] = useState();
  const [isClick, setIsClick] = useState(false);
  const createComment = async () => {
    try {
      const res = await ApiComment.createComment({
        productId: id,
        content: commentRef?.current?.innerHTML,
      });
      fetchComments();
      if (res.status === 0) {
        setStatus(true);
      }
    } catch (e) {
      setStatus(false);

    }
  };
  const commentRef = useRef();
  return (
    <div
      className={`fixed w-screen h-screen bg-white z-30 md:hidden ${
        !showPopupComment ? "translate-x-[100%]" : "translate-x-[0]"
      } transition-all`}
    >
      <div
        className={`relative translate-y-[-70px] ${
          isClick ? " animate-top-popup" : ""
        }`}
        onAnimationEnd={() => {
          setIsClick(false);
        }}
      >
        <Upload
          status={status}
          content={
            status ? "Đăng bình luận thành công" : `Đã có lỗi xảy ra`
          }
        />
      </div>
      <header className="bg-white h-[56px] pl-[16px] flex items-center text-primary">
        <div
          onClick={() => {
            setShowPopupComment(false);
          }}
        >
          <MdClose size="35px" className="text-primary mr-[20px]" />
        </div>
        <p className="text-[20px] font-semibold">Thêm bình luận</p>
      </header>
      <section className="pl-[16px]">
        <p className="font-semibold text-[14px] text-black">
          Nội dung bình luận
        </p>
        <div
          contentEditable="true"
          className="min-h-[96px] w-[95%] bg-lightGrey rounded-[4px] mt-[8px] p-[16px]"
          ref={commentRef}
        ></div>
      </section>
      <div
        onClick={() => {
          createComment();

          commentRef.current.innerHTML = "";
          setIsClick(true);
        }}
      >
        <ButtonFooterContainer>
          <LongButton
            width="90%"
            height="100%"
            color="white"
            backgroundColor="#1B4B66"
            size="14px"
          >
            <p>Đăng bình luận</p>
          </LongButton>
        </ButtonFooterContainer>
      </div>
    </div>
  );
};

export default memo(CreateComponentPopup);
