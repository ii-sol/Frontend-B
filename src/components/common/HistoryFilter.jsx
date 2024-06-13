import React, { useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import DateHeader from "~/components/common/DateHeader";
import HistoryList from "~/components/common/HistoryList";

const getMonthlyData = (pivatDate, data) => {
  const beginTime = new Date(pivatDate.getFullYear(), pivatDate.getMonth(), 1, 0, 0, 0).getTime(); // 1일 0시 0분 0초, getTime() 이용하여 숫자값으로 저장
  const endTime = new Date(pivatDate.getFullYear(), pivatDate.getMonth() + 1, 0, 23, 59, 59).getTime(); // 0일 즉 이전 달 마지막 날 59분 59초

  return data.filter((item) => {
    const itemTime = new Date(item.createdDate).getTime();
    return beginTime <= itemTime && itemTime <= endTime;
  });
};

const HistoryFilter = ({ data, filterOptions, emptyStateText, renderItem }) => {
  const [pivatDate, setPivatDate] = useState(new Date());
  const currentDate = new Date();

  const monthlyData = getMonthlyData(pivatDate, data);

  const onDecreaseMonth = () => {
    setPivatDate(new Date(pivatDate.getFullYear(), pivatDate.getMonth() - 1));
  };

  const onIncreaseMonth = () => {
    if (!isNextButtonDisabled()) {
      setPivatDate(new Date(pivatDate.getFullYear(), pivatDate.getMonth() + 1));
    }
  };

  const isNextButtonDisabled = () => {
    return pivatDate.getFullYear() === currentDate.getFullYear() && pivatDate.getMonth() === currentDate.getMonth();
  };

  const handleDateSelect = (year, month) => {
    setPivatDate(new Date(year, month));
  };

  return (
    <Container>
      <DateHeader
        year={pivatDate.getFullYear()}
        month={pivatDate.getMonth() + 1}
        leftChild={<div onClick={onDecreaseMonth}>{"<"}</div>}
        rightChild={<div onClick={onIncreaseMonth}>{">"}</div>}
        onDateSelect={handleDateSelect}
      />
      <HistoryList data={monthlyData} filterOptions={filterOptions} emptyStateText={emptyStateText} renderItem={renderItem} />
    </Container>
  );
};

export default HistoryFilter;

const Container = styled.div`
  ${tw`flex flex-col w-full gap-5`}
`;
