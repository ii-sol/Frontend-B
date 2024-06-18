import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import ReceiveIcon from "~/assets/img/common/receive.svg";
import SendIcon from "~/assets/img/common/send.svg";

const RequestCard = ({ status, name, content, dday, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Img src={status === "send" ? SendIcon : ReceiveIcon} alt="Message Icon" />
      <div>
        <p>{status === "send" ? `To.${name}` : `From.${name}`}</p>
        <p tw="font-bold">{content}</p>
      </div>
      {status === "receive" && (
        <div tw="ml-auto">
          <StatusTag dday={dday}>{parseInt(dday, 10) === 0 ? "D-day" : `D-${dday}`}</StatusTag>
        </div>
      )}
    </Container>
  );
};

export default RequestCard;

const Container = styled.div`
  ${tw`flex items-center bg-[#E9F2FF] w-full rounded-2xl text-lg p-4 my-4`}
`;

const Img = styled.img`
  ${tw`mr-4 w-10 h-10`}
`;

const StatusTag = styled.div`
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
  color: ${({ dday }) => (dday === "0" ? "#CC3535" : dday ? "#346BAC" : "#000000")};
  background-color: ${({ dday }) => (dday === "0" ? "#FFDCDC" : dday ? "#D5E0F1" : "#FFFFFF")};
`;
