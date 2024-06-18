import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw, { styled } from "twin.macro";
import { setMonth, setYear } from "../../../store/reducers/common/history";

const months = [
  "01월",
  "02월",
  "03월",
  "04월",
  "05월",
  "06월",
  "07월",
  "08월",
  "09월",
  "10월",
  "11월",
  "12월",
];

const FilterOptions = ({ onClose }) => {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const year = useSelector((state) => state.history.year);
  const month = useSelector((state) => state.history.month);
  const [yearState, setYearState] = useState(year);

  const handleMonthClick = (selectedMonth) => {
    dispatch(setMonth(selectedMonth + 1));
    dispatch(setYear(yearState));
    onClose();
  };

  const handleYearChange = (change) => {
    const newYear = yearState + change;
    setYearState(newYear);
  };

  return (
    <Container>
      <YearSelector>
        <button
          onClick={() => handleYearChange(-1)}
          tw="text-xl mx-2 text-right"
        >
          {"<"}
        </button>
        <p tw="text-xl">{yearState}년</p>
        <button
          onClick={() => handleYearChange(1)}
          disabled={yearState === currentYear}
          tw="text-xl mx-2 text-left"
        >
          {">"}
        </button>
      </YearSelector>
      <MonthGrid>
        {months.map((m, i) => (
          <MonthButton
            key={i}
            onClick={() => handleMonthClick(i)}
            selected={yearState === year && month - 1 === i}
            disabled={yearState === currentYear && i > currentMonth}
          >
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
  ${(props) =>
    props.selected && tw`bg-[rgba(21, 75, 155, 0.17)] text-[#154B9B]`}
  &:hover {
    ${(props) =>
      !props.disabled && `background-color: rgba(21, 75, 155, 0.17);`}
  }
  &:disabled {
    ${tw`cursor-not-allowed opacity-50 text-[#949494]`}
  }
`;
