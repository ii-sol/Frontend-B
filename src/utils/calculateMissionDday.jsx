import { differenceInDays } from "date-fns";

export const calculateMissionDday = (dueDate) => {
  const endDate = new Date(dueDate);
  const today = new Date();
  const dday = differenceInDays(endDate, today); // dueDate와 오늘 날짜 사이의 일 수 차이 계산

  return dday;
};
