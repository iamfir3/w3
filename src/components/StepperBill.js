import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "./Button";
import ApiBill from "../apis/bill";
import { useState } from "react";
const steps = [
  { label: "ĐANG CHỜ", status: "pending" },
  { label: "ĐANG GIAO", status: "shipping" },
  { label: "THÀNH CÔNG", status: "completed" },
  { label: "HỦY ĐƠN", status: "cancel", error: true },
];

const StepperBill = ({
  billCur,
  active,
  setActive,
  setShowUpload,
  setContentUpload,
  showUpload,
  setIsShow,
}) => {
  const [isStep, setIsStep] = useState(active);
  const setStep = (data) => {
    const numActive = steps.findIndex((item) => data === item.status);
    setIsStep(numActive);
  };

  return (
    <>
      <div className="">
        <Stepper activeStep={isStep} className="pb-2">
          {steps.map((item, index) => {
            const stepProps = {};
            if (isStep === 3) {
              stepProps.completed = false;
            }
            return (
              <Step key={item.status} {...stepProps}>
                <StepLabel
                  className="cursor-pointer"
                  onClick={() => setStep(item.status)}
                  error={
                    isStep === 3 && item.status === "cancel" ? true : false
                  }
                >
                  {item.label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {active !== isStep && (
          <div className="p-3">
            <Button
              text="XÁC NHẬN TRẠNG THÁI"
              bgColor="#4ed14b"
              textColor="#fff"
              width="100%"
              height="2"
              onClick={async () => {
                try {
                  const data = {
                    id: billCur.id,
                    status: steps[isStep].status,
                    addressId: 1,
                  }
                  const res = await ApiBill.update(data);
                  if (res.status === 0) {
setContentUpload(res);
                    setShowUpload(true);
                    setIsShow(false);
                    
                  }
                } catch (error) {}
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default StepperBill;
