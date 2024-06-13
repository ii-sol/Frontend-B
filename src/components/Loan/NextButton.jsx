import React from "react";
import tw from "twin.macro";

const NextButton = ({ onClick }) => {
  return (
    <div
      tw="fixed bottom-10 left-7 right-7 bg-blue-200 p-3 text-center rounded-2xl hover:bg-blue-300 cursor-pointer"
      onClick={onClick}
    >
      <p tw="text-xl">다음</p>
    </div>
  );
};

export default NextButton;
