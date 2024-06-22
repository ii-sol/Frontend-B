import React, { useState } from "react";
import { styled } from "styled-components";
import { setDueDate } from "../../store/reducers/Mission/mission";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";

const DueDateBottomSheet = ({ requestData, dispatch, open, onDismiss }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [noDueDateSelected, setNoDueDateSelected] = useState(false);
  const today = new Date();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNoDueDateSelected(false);
  };

  const handleSave = () => {
    if (selectedDate && !noDueDateSelected) {
      dispatch(setDueDate(selectedDate.toLocaleDateString()));
      onDismiss();
    } else if (noDueDateSelected) {
      dispatch(setDueDate("완료일 없음"));
      onDismiss();
    } else {
      dispatch(setDueDate(""));
      onDismiss();
    }
  };

  const handleNoDueDate = () => {
    setSelectedDate("");
    if (!noDueDateSelected) {
      dispatch(setDueDate("완료일 없음"));
      setNoDueDateSelected(true);
    } else {
      dispatch(setDueDate(""));
      setNoDueDateSelected(false);
    }
  };

  const datePickerProps = {
    selected: selectedDate,
    onChange: handleDateChange,
    minDate: today,
    dateFormat: "yyyy-MM-dd",
    locale: ko,
    renderCustomHeader: ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
      <CustomHeader>
        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
          {"<"}
        </button>
        <div>
          {date.getFullYear()}년 {date.getMonth() + 1}월
        </div>
        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
          {">"}
        </button>
      </CustomHeader>
    ),
  };

  return (
    <BottomSheet open={open} onDismiss={onDismiss}>
      <div style={{ height: "52vh", padding: "10px 30px 30px 30px" }}>
        <DatePickerWrapper>
          <DatePicker {...datePickerProps} inline />
        </DatePickerWrapper>

        <NoDueDate $noDueDateSelected={noDueDateSelected} onClick={handleNoDueDate}>
          ✓ 완료일 없이 미션 요청하기
        </NoDueDate>
        <SaveButton onClick={handleSave}>확인</SaveButton>
      </div>
    </BottomSheet>
  );
};

export default DueDateBottomSheet;

const DatePickerWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  width: 100%;

  .react-datepicker {
    font-size: 18px;
    border: none;
  }

  .react-datepicker__header {
    background-color: #ffffff;
  }

  .react-datepicker__current-month {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .react-datepicker__day--selected {
    background-color: #154b9b;
    color: #fff;
  }

  .react-datepicker__day-name {
    margin: 8px;
  }

  .react-datepicker__day-name:nth-child(1) {
    color: red;
  }

  .react-datepicker__day-name:nth-child(7) {
    color: blue;
  }

  .react-datepicker__day {
    margin: 8px;
  }
`;

const CustomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 20px;

  & > button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
`;

const SaveButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #e9f2ff;
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const NoDueDate = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: transparent;
  color: ${(props) => (props.$noDueDateSelected ? "#154b9b" : "#97b2dd")};
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;

  &:hover,
  &:active {
    color: ${(props) => (props.$noDueDateSelected ? "#154b9b" : "#97b2dd")};
    -webkit-tap-highlight-color: transparent;
  }
`;
