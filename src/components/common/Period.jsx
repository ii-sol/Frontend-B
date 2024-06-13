import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";

import CalendarImage from "~/assets/img/common/calendar.svg";

const Period = ({ onPeriodChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("0개월");

  const options = Array.from({ length: 12 }, (_, i) => `${i + 1}개월`);

  const handleSelectChange = (period) => {
    setSelectedPeriod(period);
    onPeriodChange(period);
  };

  return (
    <>
      <Container>
        <img src={CalendarImage} alt="Calendar" />
        <SelectedPeriod>{selectedPeriod}</SelectedPeriod>
        <ScrollContainer>
          {options.map((option) => (
            <Option key={option} selected={option === selectedPeriod} onClick={() => handleSelectChange(option)}>
              {option}
            </Option>
          ))}
        </ScrollContainer>
      </Container>
    </>
  );
};

export default Period;

const Container = styled.div`
  ${tw`flex flex-col items-center`}
`;

const ScrollContainer = styled.div`
  ${tw`overflow-y-scroll h-48 w-full max-w-xs bg-[#F4F9FF] rounded-xl p-2`}
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const SelectedPeriod = styled.p`
  ${tw`text-3xl text-center mb-4`}
`;

const Option = styled.div`
  ${tw`text-center text-xl py-2 cursor-pointer`}
  ${(props) => props.selected && tw`bg-[#CDE1FF] text-white rounded-lg`}
`;
