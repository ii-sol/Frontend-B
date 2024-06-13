import React from "react";
import tw from "twin.macro";

const Button = ({ onClick, text }) => {
  return (
    <>
      <NextButton onClick={onClick}>{text}</NextButton>
    </>
  );
};

export default Button;

const NextButton = tw.button`
  w-full
  h-9
  bg-[#CDE1FF]
  text-[#154B9B]
  font-medium
  rounded-[15px]
  text-xl
`;
