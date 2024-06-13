import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

const Member = ({ img, name, role, phoneNum, onClick }) => {
  return (
    <Container onClick={onClick}>
      <ImgContainer>
        <img src={img} alt="프로필" tw="w-[30px] h-auto" />
      </ImgContainer>
      <Info>
        <NameRoleContainer>
          <Name>{name}</Name>
          <Role>{role}</Role>
        </NameRoleContainer>
        <Phone>{phoneNum}</Phone>
      </Info>
    </Container>
  );
};

export default Member;

const Container = styled.button`
  ${tw`
  flex
  items-center
  p-4
  gap-4
  `}
  width: 100%;
  height: 77px;
  border-radius: 15px;
  background: #f4f9ff;
  font-weight: 500;
  align-items: center;
  &:hover {
    background-color: #d9e8ff;
  }
`;

const ImgContainer = styled.div`
  width: 49px;
  height: 49px;
  border-radius: 15px;
  background: rgba(255, 206, 112, 0.5);
`;

const Info = styled.div`
  ${tw`
  flex
  flex-col
  justify-center
  gap-1
  `}
`;

const NameRoleContainer = styled.div`
  ${tw`
  flex
  gap-2
  `}
`;

const Name = styled.div`
  font-size: 22px;
`;

const Role = styled.div`
  font-size: 15px;
  margin-bottom: 2px;
  margin-top: auto;
`;

const Phone = styled.div`
  font-size: 18px;
`;
