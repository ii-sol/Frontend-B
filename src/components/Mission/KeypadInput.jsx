import React, { useEffect } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Keypad from "../common/Keypad";
import { normalizeNumber } from "../../utils/NormalizeNumber";

import CoinImage from "~/assets/img/Allowance/coin.svg";

const KeypadInput = ({ displayedNumber, setDisplayedNumber, initialPrice }) => {
  useEffect(() => {
    if (initialPrice !== 0) {
      setDisplayedNumber(String(initialPrice));
    }
  }, [initialPrice, setDisplayedNumber]);

  const handleNumberClick = (number) => {
    if (displayedNumber.length < 7) {
      setDisplayedNumber((prevNumber) => prevNumber + number);
    }
  };

  const handleBackspace = () => {
    if (displayedNumber.length > 1) {
      setDisplayedNumber((prevNumber) => prevNumber.slice(0, -1));
    } else {
      setDisplayedNumber("0");
    }
  };

  return (
    <InputContainer>
      <Img src={CoinImage} alt="코인" />
      <Amount $displayedNumber={displayedNumber}>{normalizeNumber(displayedNumber)} 원</Amount>
      <Keypad onNumberClick={handleNumberClick} onBackspace={handleBackspace} />
    </InputContainer>
  );
};

export default KeypadInput;

const InputContainer = styled.div`
  ${tw`flex flex-col gap-5 items-center`}
  font-size: 18px;
`;

const Img = styled.img`
  width: 143px;
  height: auto;
  margin-bottom: 16px;
`;

const Amount = styled.div`
  width: ${(props) => (props.$displayedNumber && props.$displayedNumber.length > 0 ? "auto" : "123px")};
  height: 49px;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 15px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
