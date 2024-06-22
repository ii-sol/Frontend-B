import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import { useDispatch } from "react-redux";
import { setProfile } from "../../store/reducers/common/profile";

import Profile1 from "~/assets/img/common/character/character_sol.svg";
import Profile2 from "~/assets/img/common/character/character_moli.svg";
import Profile3 from "~/assets/img/common/character/character_rino.svg";
import Profile4 from "~/assets/img/common/character/character_shoo.svg";
import Profile5 from "~/assets/img/common/character/character_doremi.svg";
import Profile6 from "~/assets/img/common/character/character_lulu.svg";
import Profile7 from "~/assets/img/common/character/character_pli.svg";
import Profile8 from "~/assets/img/common/character/character_lay.svg";

const profiles = [
  { id: 1, src: Profile1 },
  { id: 2, src: Profile2 },
  { id: 3, src: Profile3 },
  { id: 4, src: Profile4 },
  { id: 5, src: Profile5 },
  { id: 6, src: Profile6 },
  { id: 7, src: Profile7 },
  { id: 8, src: Profile8 },
];

const Profile = ({ selectedProfileId, onSelectProfile }) => {
  //   const dispatch = useDispatch();

  const handleClick = (profileId) => {
    onSelectProfile(profileId);
    // dispatch(setProfile(profileId));
  };

  return (
    <ProfileGrid>
      {profiles.map((profile) => (
        <ProfileImage key={profile.id} src={profile.src} alt={`Profile ${profile.id}`} isSelected={selectedProfileId === profile.id} onClick={() => handleClick(profile.id)} />
      ))}
    </ProfileGrid>
  );
};

export default Profile;

const ProfileGrid = styled.div`
  ${tw`grid grid-cols-3 gap-5`}
`;

const ProfileImage = styled.img`
  ${tw`w-20 h-20 rounded-full cursor-pointer`}
  border: ${(props) => (props.isSelected ? "2px solid red" : "none")};
`;
