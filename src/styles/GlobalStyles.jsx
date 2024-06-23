import styled from "styled-components";
import tw from "twin.macro";

export const RowDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BottomBtn = styled.button`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 15px;
  width: 85%;
  height: 40px;
  background-color: #cde1ff;
  color: #154b9b;
  font-size: 20px;
  border-radius: 15px;
`;

export const BottomBtn2 = styled.button`
  margin: 15px auto -15px auto;
  width: 100%;
  height: 40px;
  background-color: #cde1ff;
  color: #154b9b;
  font-size: 20px;
  border-radius: 15px;
  backdrop-filter: blur(4px);
`;

export const BuyBtn = styled.button`
  border-radius: 15px;
  background: ${(props) => props.$background};
  display: flex;
  width: 140px;
  height: 48px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
`;

export const Badge = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 25px;
  border-radius: 5px;
  background: ${(props) => props.$back};
  color: ${(props) => props.$font};
  font-weight: 600;
`;

export const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const VirticalCreateCard = styled.button`
  width: 148px;
  height: 232px;
  border-radius: 20px;
  background: rgba(151, 178, 221, 0.4);
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
`;

export const Phrase = styled.div`
  ${tw`text-lg
  font-bold
  justify-center
  my-2
  justify-self-start`}
`;

export const Question = styled.div`
  ${tw`flex
  text-xl
  font-bold
  justify-center
  m-5`}
`;

export const HistoryLink = styled.div`
  ${tw`text-sm
  justify-self-end`}
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

export const FormWrapper = styled.div`
  ${tw`flex
  flex-col
  w-full
  gap-5
  rounded-[15px]
  h-full
  relative`}
  height: calc(100% - 60px);
`;

export const StepWrapper = styled.div`
  ${tw`flex flex-col gap-4 flex-grow`}
`;

export const ButtonWrapper = styled.div`
  ${tw`flex
  justify-between
  mt-4`}
`;

export const CompleteCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 15px;
  background: #e9f2ff;
  font-size: 25px;
  font-weight: 500;
  align-items: center;
  gap: 16px;
  padding: 20px;
`;

export const BottomBtnWrapper = styled.div`
  ${tw`flex justify-center gap-7`}
`;

export const acceptBtn = styled.button`
  border-radius: 15px;
  background: #cde1ff;
  display: flex;
  width: 113px;
  height: 48px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #154b9b;
  font-size: 20px;
  padding: 8px;
`;

export const rejectBtn = styled.button`
  border-radius: 15px;
  background: #ffd9cd;
  display: flex;
  width: 113px;
  height: 48px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #9b1d15;
  font-size: 20px;
  padding: 8px;
`;
