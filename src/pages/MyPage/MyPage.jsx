import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import Header from "~/components/common/Header";
import Profile from "../../../components/MyPage/parent/Profile";

import CharacterImage1 from "~/assets/img/common/character/character_sol.svg";
import CharacterImage2 from "~/assets/img/common/character/character_lay.svg";
import CharacterImage3 from "~/assets/img/common/character/character_moli.svg";
import CharacterImage4 from "~/assets/img/common/character/character_lulu.svg";
import CustomerServiceImage from "~/assets/img/MyPage/service.svg";
import FAQImage from "~/assets/img/MyPage/faq.svg";

const initialProfiles = [
  { id: 1, src: CharacterImage1, name: "딸" },
  { id: 2, src: CharacterImage2, name: "아들" },
  // { id: 3, src: CharacterImage3 },
  // { id: 4, src: CharacterImage4 },
];

const MyPage = () => {
  const [profiles, setProfiles] = useState(initialProfiles);

  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/");
  };

  const handleChildClick = () => {
    navigate("/mypage/child"); // TODO: 해당하는 아이의 상세 페이지로
  };

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"마이페이지"} right={""} />
      <S.StepWrapper>
        <Profile />
        <Management>
          <S.Phrase>연결 관리</S.Phrase>
        </Management>
        <MemberGrid>
          {profiles.map((profile) => (
            <ProfileWrapper key={profile.id} onClick={handleChildClick}>
              <ProfileImage src={profile.src} />
              <ProfileName>{profile.name}</ProfileName>
            </ProfileWrapper>
          ))}
        </MemberGrid>
        <MenuWrapper>
          <Menu>
            <img src={CustomerServiceImage} />
            <div>고객 센터 문의하기</div>
          </Menu>
          <Menu>
            <img src={FAQImage} />
            <div>Q&A</div>
          </Menu>
        </MenuWrapper>
      </S.StepWrapper>
    </S.Container>
  );
};

export default MyPage;

const Management = styled.div`
  ${tw`
  flex
  mb-2
  items-center
  justify-between
  `}
`;

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const ProfileWrapper = styled.div`
  ${tw`
    flex
    flex-col
    items-center
  `}
`;

const ProfileImage = styled.img`
  ${tw`
    w-24
    h-24
    object-cover
    rounded-full
    cursor-pointer
  `}
  border: ${(props) => (props.isSelected ? "2px solid red" : "none")};
`;

const ProfileName = styled.div`
  ${tw`
    mt-2
    text-center
    text-lg
  `}
`;

const MenuWrapper = styled.div`
  ${tw`flex flex-col my-4 gap-4`}
`;

const Menu = styled.div`
  ${tw`flex gap-4 text-2xl items-center`}

  & > img {
    ${tw`
    w-14
    `}
  }
`;
