import React, { memo } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from 'react'

const InputField = ({
  label,
  value,
  setValue,
  type,
  typeInput,
  setInvalidFields,
  invalidFields,
}) => {
  const [typeInputState, setTypeInputState] = useState(typeInput);
  return (
    <div className="w-full my-3">
      <label htmlFor="field" className="text-xs">
        {label}
      </label>
      <div className='flex bg-[#f3f4f6] items-center'>
        <input type={typeInputState}
          id={label?.replace(' ', '')}
          value={value}
          onChange={(e) =>
            setValue((prev) => ({
              ...prev,
              [type]: e.target.value,
            }))
          }
          className="outline-none p-2 bg-gray-100 rounded-md w-full"
          onFocus={() => setInvalidFields([])}>
        </input>
        {typeInput === 'password' && (typeInputState === 'password' ? <AiOutlineEye size={26} className='mr-[20px]' onClick={() => {
          setTypeInputState((prev) => {
            if (prev === 'password') {
              return 'text';
            }
            else return 'password';
          })
        }}></AiOutlineEye> : <AiOutlineEyeInvisible size={26} className='mr-[20px]' onClick={() => {
          setTypeInputState((prev) => {
            if (prev === 'password') {
              return 'text';
            }
            else return 'password';
          })
        }}></AiOutlineEyeInvisible>)}
      </div>

      {invalidFields.length > 0 &&
        invalidFields?.some((i) => i.field === type) && (
          <small className="text-red-500 italic">
            {invalidFields?.find((i) => i.field === type).msg}
          </small>
        )}

    </div>
  );
};

export default memo(InputField);
