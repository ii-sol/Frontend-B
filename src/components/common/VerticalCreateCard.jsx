import React from "react";
import { styled } from "styled-components";

const VirticalCreateCard = ({ text }) => {
  return <Container>{text}</Container>;
};

export default VirticalCreateCard;

const Container = styled.button`
  width: 148px;
  height: 232px;
  border-radius: 20px;
  background: rgba(151, 178, 221, 0.4);
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
`;
