import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ApiCart from "../apis/cart";

export default function AlertPopup({
  open,
  setOpen,
  idDelete,
  setReload,
  setActiveNotify,
}) {
  const handleDelete = async () => {
    try {
      let params = { cids: [idDelete] };
      console.log(params);
      let res = await ApiCart.delete(params);
      if (res.status === 0) {
        setOpen(false);
        setReload((prev) => !prev);
        setActiveNotify("success");
      }
    } catch (error) {
      setActiveNotify("error");
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Hành động không thể hoàn tác."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn thật sự muốn xóa sản phẩm đã chọn khỏi giỏi hàng ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Quay lại</Button>
          <Button onClick={() => handleDelete()} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
