import React, { useState } from "react";
import tw from "twin.macro";
import calender from "~/assets/img/child/calender.svg"; // 이미지 파일 경로를 확인하세요.
import styled from "styled-components";
import NextButton from "../../../components/Loan/NextButton";
import { useNavigate } from "react-router-dom";

const ScrollContainer = styled.div`
  ${tw`overflow-y-scroll h-48 w-full max-w-xs bg-blue-100 rounded-xl p-2`}
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const Option = styled.div`
  ${tw`text-center text-xl py-2 cursor-pointer`}
  ${(props) => props.selected && tw`bg-blue-200 rounded-lg`}
`;

const Period = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1개월");
  const navigate = useNavigate();

  const options = Array.from({ length: 12 }, (_, i) => `${i + 1}개월`);

  const handleSelectChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleNext = () => {
    navigate("/loan/message");
  };
  return (
    <>
      <div tw="flex flex-col items-center p-5">
        <img src={calender} alt="Calendar" />
        <p tw="text-4xl text-center mb-5">{selectedPeriod}</p>
        <ScrollContainer>
          {options.map((option) => (
            <Option
              key={option}
              selected={option === selectedPeriod}
              onClick={() => handleSelectChange(option)}
            >
              {option}
            </Option>
          ))}
        </ScrollContainer>
      </div>
      <footer tw="fixed bottom-2 left-0 right-0 w-full p-4">
        <NextButton onClick={handleNext} />
      </footer>
    </>
  );
};

export default Period;
