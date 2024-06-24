import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import { fetchUserInfo } from "../../services/user";
import { useSelector, useDispatch } from "react-redux";
import * as S from "../../styles/GlobalStyles";
import { setChildInfo } from "../../store/reducers/common/family";

import Header from "~/components/common/Header";
import Profile from "~/components/MyPage/Profile";

import CustomerServiceImage from "~/assets/img/MyPage/service.svg";
import FAQImage from "~/assets/img/MyPage/faq.svg";

import availableProfiles from "../../assets/data/profileImages";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [profiles, setProfiles] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sn = useSelector((state) => state.user.userInfo.sn);
  const familyInfo = useSelector((state) => state.user.userInfo.familyInfo);
  const childInfo = useSelector((state) => state.family.childInfo);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchUserInfo(sn);
        setUserInfo(data);
        if (familyInfo) {
          const familyProfiles = await Promise.all(
            familyInfo.map(async (member, index) => {
              const memberInfo = await fetchUserInfo(member.sn);
              const selectedProfile = availableProfiles.find((profile) => profile.id === memberInfo.profileId);
              const profileImageSrc = selectedProfile ? selectedProfile.src : profiles[0].src;
              return {
                id: index,
                sn: member.sn,
                src: profileImageSrc,
                name: member.name,
                phoneNum: memberInfo.phoneNum,
                score: memberInfo.score,
                birthDate: memberInfo.birthDate,
              };
            })
          );
          setProfiles(familyProfiles);
          dispatch(setChildInfo(familyProfiles));
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (sn) {
      fetchUserData();
    }
  }, [sn, familyInfo]);

  const handleLeftClick = () => {
    navigate("/");
  };

  const handleChildClick = (id) => {
    navigate(`/mypage/child/${id}`);
  };

  return (
    <S.Container>
      <Header onLeftClick={handleLeftClick} title={"마이페이지"} right={""} />
      <S.StepWrapper>
        {userInfo ? <Profile userInfo={userInfo} /> : <LoadingPlaceholder>Loading...</LoadingPlaceholder>}
        <Management>
          <S.Phrase>연결 관리</S.Phrase>
        </Management>
        <MemberGrid>
          {profiles.map((profile) => (
            <ProfileWrapper key={profile.id} onClick={() => handleChildClick(profile.id)}>
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

const LoadingPlaceholder = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    h-full
  `}
`;
