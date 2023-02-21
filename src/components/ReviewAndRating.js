import Avatar from "../assets/anonAvatar.png";
import { AiFillStar } from "react-icons/ai";
import ButtonFooterContainer from "./ButtonFooterContainer";
import LongButton from "./LongButton";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import PagePagination from "./PagePagination";
import { useEffect, useRef, useState } from "react";
import Pagination from "@mui/material/Pagination";
import ApiComment from "../apis/comment";
import { NotiStatus } from "./UploadStatus";

export const ReviewAndRatingMobile = ({
  commentData,
  name,
  shortDescription,
  score,
  setShowPopupReview,
  showPopupReview,
  setShowPopupComment,
  setShowHeader,
  currentPage,
  setCurrentPage,
}) => {
  const topRef = useRef();
  useEffect(() => {
    topRef?.current.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <div
      className={`fixed z-20 h-screen w-screen top-0 left-0 bg-lightGrey flex flex-col md:hidden ${
        !showPopupReview ? "translate-x-[100%]" : "translate-x-[0]"
      } transition-all`}
    >
      <header className="bg-white h-[56px] pl-[16px] flex-none flex items-center ">
        <MdOutlineArrowBackIosNew
          size="24"
          onClick={() => {
            setShowPopupReview(false);
            setShowHeader(true);
          }}
        />
      </header>
      <section className="bg-white pl-[16px] pt-[6px]">
        <p className="text-[16px] font-medium">{name}</p>
        <p className="text-[14px] font-medium text-darkGrey">
          This is short description
        </p>
        <div className="flex items-center mt-[16px] pb-[10px]">
          <div className="flex items-center mr-[12px]">
            <span className="text-[16px] text-black font-semibold mr-[4px]">
              {score}
            </span>
            <AiFillStar size="25" className="text-yellow" />
          </div>
          <span className="text-[14px] text-black font-semibold">Đánh giá</span>
        </div>
      </section>

      <section className="bg-white pl-[16px] flex-auto overflow-y-auto mt-[8px]">
        <div ref={topRef}></div>
        {commentData?.rows?.length > 0 ? (
          <div className="pt-[24px]">
            {commentData?.rows?.map((comment, i) => {
              return (
                <div key={i} className="mb-[24px]">
                  <div className="flex items-center mb-[12px]">
                    <div className="mr-[12px]">
                      <img
                        src={Avatar}
                        className="rounded-[50px] w-[40px] h-[40px]"
                      ></img>
                    </div>
                    <div>
                      <p className="text-black font-semibold md:text-[14px]">
                        {comment?.commentator?.name}
                      </p>
                      <p className="text-darkGrey-tint font-medium md:text-[14px]">
                        {comment?.createdAt.substring(0, 10)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-darkGrey-tint font-medium md:text-[14px]">
                      {comment?.content}
                    </p>
                  </div>
                </div>
              );
            })}
        
            <div className="flex justify-center pb-[10px]">
              <Pagination
                count={Math.ceil(commentData.count / 5)}
                color="primary"
                size="small"
                page={currentPage}
                onChange={handleChangePage}
              />
            </div>

            <div className="h-[66px]"></div>
          </div>
        ) : (
          <div className="h-[50px] flex items-center justify-center text-[16px] font-medium text-darkGrey">
            <p>Sản phẩm này không có bình luận</p>
          </div>
        )}
      </section>

      <div
        onClick={() => {
          setShowPopupComment(true);
          setShowHeader(false);
        }}
      >
        <ButtonFooterContainer>
          <LongButton
            width="90%"
            height="44px"
            backgroundColor="#1B4B66"
            color="white"
            size="14px"
          >
            <AiOutlinePlus color="white" size="22px" className="mr-[8px]" />
            <p>Viết bình luận</p>
          </LongButton>
        </ButtonFooterContainer>
      </div>
    </div>
  );
};

export const ReviewAndRatingDesktop = ({
  commentData,
  currentPage,
  setCurrentPage,
  id,
  fetchComments,
}) => {
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };
  const commentRef = useRef();
  const headRef = useRef();
  const [content, setContent] = useState("");
  const createComment = async () => {
    try {
      const res = await ApiComment.createComment({
        productId: id,
        content: commentRef?.current?.innerHTML,
      });
      fetchComments();
      if (res.status === 0) {
        setActiveNotiStatus("success");
        setContent("Đăng bình luận thành công");
      } else {
        setActiveNotiStatus("error");
        setContent("Đăng bình luận thất bại");
      }
    } catch (e) {
      setActiveNotiStatus("error");
      setContent("Đăng bình luận thất bại");
    }
  };
  const [activeNotiStatus, setActiveNotiStatus] = useState(false);
  return (
    <div>
      <div ref={headRef} className='pt-[30px]'></div>
      {
        <NotiStatus
          active={activeNotiStatus}
          setActive={setActiveNotiStatus}
          content={content}
        />
      }
      {commentData.rows && (
        <div>
          {commentData?.rows?.map((comment, i) => {
            return (
              <div key={i} className="mb-[24px]">
                <div className="flex items-center mb-[12px]">
                  <div className="mr-[12px]">
                    <img
                      src={Avatar}
                      className={`rounded-[50px] lg:w-[80px] lg:h-[80px] md:w-[53px] md:h-[53px]`}
                    ></img>
                  </div>
                  <div>
                    <p className="text-black font-semibold lg:text-[24px] md:text-[20px]">
                      {comment?.commentator?.name}
                    </p>
                    <p className="text-darkGrey-tint font-medium lg:text-[20px] md:text-[16px]">
                      {comment?.createdAt.substring(0, 10)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-darkGrey-tint font-medium md:text-[20px]">
                    {comment?.content}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="flex justify-end">
            <Pagination
              count={Math.ceil(commentData.count / 5)}
              color="primary"
              size="large"
              page={currentPage}
              onChange={handleChangePage}
            />
          </div>
        </div>
      )}
      <div
        contentEditable="true"
        className="min-h-[100px] w-full bg-white border-[1px] border-primary outline-primary p-[8px] rounded-[8px] mt-[16px]"
        ref={commentRef}
      ></div>

      <div
        className="flex justify-end mt-[16px] mb-[16px]"
        onClick={() => {
          createComment();
          
          commentRef.current.innerHTML = "";
          headRef.current.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <LongButton
          width="150px"
          height="44px"
          backgroundColor="#1B4B66"
          color="white"
        >
          <p>Đăng bình luận</p>
        </LongButton>
      </div>
    </div>
  );
};
