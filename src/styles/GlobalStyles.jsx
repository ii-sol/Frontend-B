import styled from "styled-components";

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
  backdrop-filter: blur(4px);
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
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
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
`;

export const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
