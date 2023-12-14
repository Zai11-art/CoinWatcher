import React from "react";
import Form from "./Form";
import { useSelector } from "react-redux";
import { RootState } from "../../state";

const RegisterPage = () => {
  const mode = useSelector((state : RootState) => state.mode)
  return (
    <div className={`x-2 flex h-[100%] w-full flex-col items-center ${mode === 'light' ? "bg-slate-300/95" : "bg-[#051925]"}`}>
      <Form></Form>
    </div>
  );
};

export default RegisterPage;

// HEX CODES:
// #051925
// #062c43
// #054569
// #5591a9
// #9ccddc
// #ced7e0
