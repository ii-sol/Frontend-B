import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

const Keypad = ({ onNumberClick, onBackspace }) => {
  const handleClick = (number) => {
    onNumberClick(number);
  };

  return (
    <Container>
      <Button onClick={() => handleClick("1")}>1</Button>
      <Button onClick={() => handleClick("2")}>2</Button>
      <Button onClick={() => handleClick("3")}>3</Button>
      <Button onClick={() => handleClick("4")}>4</Button>
      <Button onClick={() => handleClick("5")}>5</Button>
      <Button onClick={() => handleClick("6")}>6</Button>
      <Button onClick={() => handleClick("7")}>7</Button>
      <Button onClick={() => handleClick("8")}>8</Button>
      <Button onClick={() => handleClick("9")}>9</Button>
      <Button onClick={() => handleClick("00")}>00</Button>
      <Button onClick={() => handleClick("0")}>0</Button>
      <Button onClick={onBackspace}>←</Button>
    </Container>
  );
};

export default Keypad;

const Container = styled.div`
  ${tw`
  grid
  mb-2
  items-center
  bg-[#F4F9FF]
  rounded-[15px]
  `}
  width: 100%;
  height: auto;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Button = styled.button`
  height: 80px;
  font-weight: 500;
  font-size: 26px;
  border-radius: 15px;
  &:active {
    background-color: #d9e8ff;
  }
`;
