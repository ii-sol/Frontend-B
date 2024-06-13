import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

const Header = ({ left, title, right }) => {
  return (
    <Container>
      <Left>{left}</Left>
      <Title>{title}</Title>
      <Right>{right}</Right>
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
