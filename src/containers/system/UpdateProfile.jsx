import { toBase64 } from "../../ultils/common";
import { useState } from "react";
import { apiUpdateUser, apiGetCurrent } from "../../apis/user";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";

function UpdateProfile() {
  const [infor, setInfo] = useState({
    avatar: "",
    name: "",
    email: "",
    phone: "",
  });
  const dispatch = useDispatch();
  const handleUpdate = async () => {
    dispatch(actions.updateProfile(infor.avatar));
  };
  const handleImage = async (e) => {
    e.stopPropagation();
    const { type } = e.target.files[0];
    if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
      let imageBase64 = await toBase64(e.target.files[0]);
      setInfo((prev) => ({ ...prev, avatar: imageBase64 }));
    } else {
      console.log("Type image is not supported.");
    }
  };
  return (
    <>
      <div className="h-[60px]">
        <input
          type="file"
          id="avatar"
          file={infor.avatar}
          onChange={handleImage}
        />
        <button className="bg-gray-500" onClick={handleUpdate}>
          ONSUBMIT
        </button>
      </div>
    </>
  );
}

export default UpdateProfile;
