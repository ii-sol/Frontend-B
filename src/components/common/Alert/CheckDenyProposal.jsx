import React, { useState } from "react";
import * as S from "../../../styles/GlobalStyles";
import { styled } from "styled-components";
import { deleteAllNoti } from "../../../store/reducers/Noti/notification";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
import {
  postProposalYN,
  setDisplay,
} from "../../../store/reducers/Invest/suggestDetail";

const CheckDenyProposal = ({ onDismiss, proposeId }) => {
  const [messages, setMessages] = useState("");
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
  const handleInputChange = (message) => {
    setMessages(message);
  };
  const dispatch = useDispatch();
  const onYes = () => {
    dispatch(
      postProposalYN({
        proposeId: proposeId,
        accept: false,
        message: messages,
        csn: selectedChildSn,
      })
    );
    dispatch(setDisplay(false));
    onDismiss();
  };

  const onNo = () => {
    onDismiss();
  };

  return (
    <S.Container>
      <Wrapper>거절 사유</Wrapper>
      <Message
        placeholder="거절 사유를 적어주세요!"
        maxLength="100"
        onChange={handleInputChange}
        back="white"
        area="#f4f9ff"
      />
      <RowDiv>
        <Btn onClick={onYes}>완료</Btn>
        <Btn onClick={onNo}>취소</Btn>
      </RowDiv>
    </S.Container>
  );
};

export default CheckDenyProposal;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  font-size: 23px;
  word-break: keep-all;
  text-align: center;
`;

const RowDiv = styled.div`
  display: flex;
  width: 100%;
`;

const Btn = styled.button`
  font-size: 23px;
  font-weight: 600;
  padding: 20px 0px;
  width: 50%;
  background-color: #e9f2ff;
  &:hover {
    background-color: #cee2ff;
  }
`;
