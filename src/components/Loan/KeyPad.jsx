import React from "react";
import tw from "twin.macro";

const Keypad = ({ onButtonClick }) => {
  return (
    <div tw="grid grid-cols-3 gap-3 mt-8 w-full max-w-xs mx-auto bg-blue-100 rounded-2xl p-4">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "←"].map(
        (value) => (
          <button
            key={value}
            tw="text-2xl p-4 hover:bg-blue-200 rounded-2xl"
            onClick={() => onButtonClick(value)}
          >
            {value}
          </button>
        )
      )}
    </div>
  );
};

export default Keypad;
