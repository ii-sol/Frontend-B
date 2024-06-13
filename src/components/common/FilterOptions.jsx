import React, { useState } from "react";
import tw, { styled } from "twin.macro";

const months = ["01월", "02월", "03월", "04월", "05월", "06월", "07월", "08월", "09월", "10월", "11월", "12월"];

const FilterOptions = ({ onSelect, onClose }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth());

  const handleMonthClick = (selectedMonth) => {
    if (year < currentYear || (year === currentYear && selectedMonth <= currentMonth)) {
      setMonth(selectedMonth);
      onSelect(year, selectedMonth);
      onClose();
    }
  };

  const handleYearChange = (change) => {
    const newYear = year + change;
    if (newYear <= currentYear) {
      setYear(newYear);
    }
  };

  return (
    <Container>
      <YearSelector>
        <button onClick={() => handleYearChange(-1)} tw="text-xl mx-2 text-right">
          {"<"}
        </button>
        <p tw="text-xl">{year}년</p>
        <button onClick={() => handleYearChange(1)} tw="text-xl mx-2 text-left">
          {">"}
        </button>
      </YearSelector>
      <MonthGrid>
        {months.map((m, i) => (
          <MonthButton key={i} onClick={() => handleMonthClick(i)} selected={month === i} disabled={year === currentYear && i > currentMonth}>
            {m}
          </MonthButton>
        ))}
      </MonthGrid>
    </Container>
  );
};

export default FilterOptions;

const Container = styled.div`
  ${tw`flex flex-col items-center p-4`}
`;

const YearSelector = styled.div`
  ${tw`flex justify-between w-full mb-4`}
`;

const MonthGrid = styled.div`
  ${tw`grid grid-cols-4 gap-4`}
`;

const MonthButton = styled.button`
  ${tw`text-lg py-2 px-4 rounded-2xl text-sm`}
  ${(props) => props.selected && tw`bg-[rgba(21, 75, 155, 0.17)] text-[#154B9B]`}
  &:hover {
  ${(props) => !props.disabled && `background-color: rgba(21, 75, 155, 0.17);`}
  }
  &:disabled {
  ${tw`cursor-not-allowed opacity-50 text-[#949494]`}
`;
