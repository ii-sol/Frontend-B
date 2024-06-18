import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { MdArrowBackIos } from "react-icons/md";

const Header = ({ left, onLeftClick, title, right, onRightClick }) => {
  return (
    <Container>
      <Left onClick={onLeftClick}>
        <MdArrowBackIos />
      </Left>
      <Title>{title}</Title>
      <Right onClick={onRightClick}>{right}</Right>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  ${tw`
  grid
  mb-4
  items-center
  `}
  grid-template-columns: 1fr auto 1fr;
`;

const Left = styled.div`
  ${tw`text-2xl`}
  justify-self: start;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 27px;
  font-weight: 500;
  justify-self: center;
`;

const Right = styled.div`
  ${tw`text-lg`}
  justify-self: end;
`;
