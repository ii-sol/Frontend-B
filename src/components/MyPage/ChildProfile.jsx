import React, { useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import { getCredibility } from "../../utils/getCredibility";

const ChildProfile = ({ childInfo }) => {
  const initialBirthDate = new Date(childInfo.birthDate);
  const initialBirthDateString = initialBirthDate.toISOString().slice(0, 10);
  const [profileData, setProfileData] = useState({
    name: childInfo.name,
    birthDate: initialBirthDateString,
    phoneNum: childInfo.phoneNum,
    profileSrc: childInfo.src,
    credibility: getCredibility(childInfo.score),
  });

  return (
    <Container>
      <ProfileWrapper>
        <ProfileImage src={profileData.profileSrc} alt="프로필 이미지" />
        <InfoWrapper>
          <Info>
            이름: <span>{profileData.name}</span>
          </Info>
          <Info>
            생일: <span>{profileData.birthDate}</span>
          </Info>
          <Info tw="flex-col gap-0">
            전화번호: <span>{profileData.phoneNum}</span>
          </Info>
          <Info>
            신뢰도: <span>{profileData.credibility}</span>
          </Info>
        </InfoWrapper>
      </ProfileWrapper>
    </Container>
  );
};

export default ChildProfile;

const Container = styled.div`
  width: 100%;
  height: 212px;
  background-color: #ffffff;
  filter: drop-shadow(0px 0px 5px #c8ddff);
  margin: 20px 0;
  border-radius: 15px;
  position: relative;
`;

const ProfileWrapper = styled.div`
  ${tw`
    flex
    items-center
    h-full
  `}
  padding: 20px;
`;

const ProfileImage = styled.img`
  ${tw`
    w-32
    h-32
    rounded-full
    mr-3
  `}
`;

const InfoWrapper = styled.div`
  ${tw`
    flex
    flex-col
  `}
`;

const Info = styled.div`
  ${tw`
    flex
    text-base
    font-bold
    mb-1
    gap-1
  `}

  & > span {
    ${tw`
      text-base
      font-medium
    `}
    width: auto;
  }
`;

const Input = styled.input`
  ${tw`
    text-base
    mb-2
  `}
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 4px;
  width: 69%;
`;

const EditButton = styled.button`
  ${tw`
    absolute
    top-3
    right-3
    border-none
    cursor-pointer
  `}
`;

const SaveButton = styled.button`
  ${tw`
    absolute
    bottom-3
    right-3
    px-3
    py-2
    bg-white
    text-blue-600
    rounded-md
    border-none
    cursor-pointer
    hover:bg-blue-600
  `}
`;
