import React from "react";
import * as S from "../../../styles/GlobalStyles";
import { styled } from "styled-components";
import { deleteAllNoti } from "../../../store/reducers/Noti/notification";
import { useDispatch } from "react-redux";

const CheckDeleteNoti = ({ onDismiss }) => {
  const dispatch = useDispatch();
  const onYes = () => {
    dispatch(deleteAllNoti(1));
    onDismiss();
  };

  const onNo = () => {
    onDismiss();
  };
  return (
    <S.Container>
      <Wrapper>모든 알림을 삭제하시겠습니까?</Wrapper>
      <RowDiv>
        <Btn onClick={onYes}>예</Btn>
        <Btn onClick={onNo}>아니요</Btn>
      </RowDiv>
    </S.Container>
  );
};

export default CheckDeleteNoti;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
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
