import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus } from "../../../store/reducers/common/history";

const Filter = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (location.pathname === "/invest/history") {
      const newOptions = [
        { label: "전체", status: 0 },
        { label: "수락", status: 1 },
        { label: "거절", status: 2 },
        { label: "대기", status: 3 },
      ];
      setOptions(newOptions);
      setSelectedOption(newOptions[0]);
    } else if (location.pathname === "/invest/tradehistory") {
      const newOptions = [
        { label: "전체", status: 0 },
        { label: "구매", status: 1 },
        { label: "판매", status: 2 },
      ];
      setOptions(newOptions);
      setSelectedOption(newOptions[0]);
    } else if (location.pathname === "/allowance/history") {
      const newOptions = [
        { label: "전체", status: 0 },
        { label: "조르기", status: 1 },
        { label: "정기용돈", status: 2 },
      ];
      setOptions(newOptions);
      setSelectedOption(newOptions[0]);
    } else if (location.pathname === "/allowance/irregular/history") {
      const newOptions = [
        { label: "전체", status: 0 },
        { label: "완료", status: 1 },
        { label: "취소", status: 2 },
      ];
      setOptions(newOptions);
      setSelectedOption(newOptions[0]);
    } else if (location.pathname === "/mission/history") {
      const newOptions = [
        { label: "전체", status: 0 },
        { label: "완료", status: 1 },
        { label: "취소", status: 2 },
      ];
      setOptions(newOptions);
      setSelectedOption(newOptions[0]);
    } else if (location.pathname === "/loan/history") {
      const newOptions = [
        { label: "전체", status: 0 },
        { label: "완료", status: 4 },
        { label: "거절", status: 5 },
      ];
      setOptions(newOptions);
      setSelectedOption(newOptions[0]);
    } else {
    }
  }, [location.pathname]);

  const handleOptionClick = (option) => {
    dispatch(setStatus(option.status));
    setSelectedOption(option);
  };

  return (
    <Container>
      {options.map((option) => (
        <Button key={option.status} selected={selectedOption?.status === option.status} onClick={() => handleOptionClick(option)}>
          {option.label}
        </Button>
      ))}
    </Container>
  );
};

export default Filter;

const Container = styled.div`
  ${tw`flex gap-3 mb-4`}
`;

const Button = styled.button`
  ${tw`px-3.5 py-1.5 rounded-[5px] border-none`}
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  ${({ selected }) => selected && tw`bg-[#154B9B] text-[#FFFFFF]`}
  ${({ selected }) => !selected && tw`bg-[#FFFFFF] text-[#949494]`}
  font-size:15px;
  font-weight: 400;
`;
