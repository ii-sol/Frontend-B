import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

const RequestCardChild = ({ status, receiver, allowance, img, message }) => {
  const normalizeNumber = (number) => {
    return parseFloat(number).toLocaleString("en-US");
  };

  return (
    <Container>
      <Content>
        {status && <StatusTag status={status}>{status}</StatusTag>}
        <Receiver>{receiver}</Receiver>
        <Allowance>{normalizeNumber(allowance)}원</Allowance>
        <Message>{message}</Message>
      </Content>
      <Img src={img} alt="아이콘" />
    </Container>
  );
};

export default RequestCardChild;

const Container = styled.div`
  ${tw`
  flex
  flex-col
  p-5
  gap-1
  relative
  `}
  width: 148px;
  height: 232px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
`;

const Content = styled.div`
  ${tw`
  flex
  flex-col
  items-start
  gap-1
  `}
`;

const StatusTag = styled.div`
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
  color: ${({ status }) => (status === "완료" ? "#346BAC" : status === "취소" ? "#CC3535" : "#000000")};
  background-color: ${({ status }) => (status === "완료" ? "#D5E0F1" : status === "취소" ? "#FFDCDC" : "#FFFFFF")};
`;

const Receiver = styled.div`
  font-weight: 700;
`;

const Allowance = styled.div`
  color: #154b9b;
  font-size: 15px;
  font-weight: 700;
`;

const Message = styled.div`
  font-size: 12px;
  font-weight: 700;
`;

const Img = styled.img`
  position: absolute;
  bottom: 12px;
  right: 10px;
  width: 78px;
  height: auto;
`;
