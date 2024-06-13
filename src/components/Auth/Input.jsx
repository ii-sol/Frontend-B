import React, { useState, useRef, useEffect } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

const Input = ({ type, name, value, onChange, width }) => {
  const inputRef = useRef(null);
  const spanRef = useRef(null);
  const [inputWidth, setInputWidth] = useState("auto");

  useEffect(() => {
    if (spanRef.current) {
      const newWidth = `${spanRef.current.scrollWidth}px`;
      setInputWidth(width || newWidth);
    }
  }, [value, width]);

  return (
    <InputWrapper>
      <HiddenSpan ref={spanRef}>{value || "     "}</HiddenSpan>
      <StyledInput type={type} name={name} value={value} onChange={onChange} ref={inputRef} style={{ width: inputWidth }} />
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const StyledInput = styled.input`
  ${tw`p-5
  rounded-[15px]
  border
  border-[#FFDCDC]
  bg-[#EAF4FF]`}
  width: fit-content;
  max-width: 80%;
  height: auto;
  font-weight: 500;
  text-align: right
  border-radius: 15px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
`;

const HiddenSpan = styled.span`
  ${tw`
  rounded-[15px]
  border
  border-[#FFDCDC]
  bg-[#EAF4FF]`}
  position: absolute;
  visibility: hidden;
  white-space: pre;
`;
