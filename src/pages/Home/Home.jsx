import React, { useEffect, useState } from "react";
import Account from "../../components/common/Account";
import styled from "styled-components";
import invest from "../../assets/img/Home/invest.svg";
import allowance from "../../assets/img/Home/allowance.svg";
import mission from "../../assets/img/Home/mission.svg";
import loan from "../../assets/img/Home/loan.svg";
import noti from "../../assets/img/Home/alert.svg";
import mypage from "../../assets/img/Home/mypage.svg";
import one from "../../assets/img/Home/one.svg";
import two from "../../assets/img/Home/two.svg";
import three from "../../assets/img/Home/three.svg";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/GlobalStyles";

import isLogin from "../../utils/isLogin";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../services/user";

import Profile1 from "~/assets/img/common/character/character_sol.svg";
import Profile2 from "~/assets/img/common/character/character_moli.svg";
import Profile3 from "~/assets/img/common/character/character_rino.svg";
import Profile4 from "~/assets/img/common/character/character_shoo.svg";
import Profile5 from "~/assets/img/common/character/character_doremi.svg";
import Profile6 from "~/assets/img/common/character/character_lulu.svg";
import Profile7 from "~/assets/img/common/character/character_pli.svg";
import Profile8 from "~/assets/img/common/character/character_lay.svg";
import { setSelectedChildSn } from "../../store/reducers/Auth/user";
import { fetchChildInfo } from "../../services/home";
import { normalizeNumber } from "../../utils/normalizeNumber";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = isLogin();
  const [userInfo, setUserInfo] = useState(null);
  const [selectedChildName, setSelectedChildName] = useState("아이");
  let familyInfo;
  if (isLoggedIn) {
    familyInfo = useSelector((state) => state.user.userInfo.familyInfo);
  }
  console.log(familyInfo, "familyInfo");
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
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

  const getProfileSrc = (profileId) => {
    const profile = profiles.find((p) => p.id === profileId);
    return profile ? profile.src : null;
  };

  useEffect(() => {
    const getChildInfo = async () => {
      const data = await fetchChildInfo(selectedChildSn);
      setUserInfo(data.response);
    };

    getChildInfo();
  }, []);

  return (
    <S.Container>
      <Wrapper>
        {selectedChildSn && isLoggedIn ? (
          <>
            <div
              style={{ color: "#404040", fontSize: "25px", fontWeight: "700" }}
            >
              {selectedChildName} 아이 <br />
              관리하기
            </div>
            <S.RowDiv style={{ gap: "20px" }}>
              <img
                src={mypage}
                style={{ width: "42px" }}
                onClick={() => navigate("/mypage")}
              />
              <img
                src={noti}
                style={{ width: "42px" }}
                onClick={() => navigate("/notification")}
              />
            </S.RowDiv>
          </>
        ) : isLoggedIn ? (
          <>
            <div
              style={{ color: "#404040", fontSize: "25px", fontWeight: "700" }}
            >
              아이를 <br />
              선택해주세요!
            </div>
            <S.RowDiv style={{ gap: "20px" }}>
              <img
                src={mypage}
                style={{ width: "42px" }}
                onClick={() => navigate("/mypage")}
              />
              <img
                src={noti}
                style={{ width: "42px" }}
                onClick={() => navigate("/notification")}
              />
            </S.RowDiv>
          </>
        ) : (
          <div></div>
        )}
      </Wrapper>
      {isLoggedIn ? (
        <ChildWrapper>
          {familyInfo.map((family) => (
            <ChildDiv
              key={family.sn}
              onClick={() => {
                setSelectedChildName(family.name);
                dispatch(setSelectedChildSn(family.sn));
              }}
            >
              <ChildImg src={getProfileSrc(family.profileId)} />
            </ChildDiv>
          ))}
        </ChildWrapper>
      ) : (
        <></>
      )}

      <S.CenterDiv>
        {isLoggedIn ? (
          <Account accountNum={0}></Account>
        ) : (
          <Account accountNum={2}></Account>
        )}
      </S.CenterDiv>
      <RowDiv $isFirst>
        <Btn $width={1} onClick={() => navigate("/invest")}>
          투자관리
          <Img src={invest} $right={10} $imgwidth={140} />
        </Btn>
        <Btn $width={2} onClick={() => navigate("/allowance")}>
          용돈
          <br />
          관리
          <Img src={allowance} $bottom={10} $right={0} $imgwidth={80} />
        </Btn>
      </RowDiv>
      <RowDiv>
        <Btn $width={2} onClick={() => navigate("/mission")}>
          미션
          <br />
          관리
          <Img src={mission} $bottom={10} $right={5} $imgwidth={90} />
        </Btn>
        <Btn $width={1} onClick={() => navigate("/loan/main")}>
          대출관리
          <Img src={loan} $bottom={10} $right={10} $imgwidth={90} />
        </Btn>
      </RowDiv>
      <ColumnDiv>
        <BottomDiv>
          <BImg src={one} />
          <Div>
            {selectedChildName}님의 금리는 <br />
            {userInfo?.baseRate}%입니다.
          </Div>
        </BottomDiv>
        <BottomDiv>
          <BImg src={two} />
          <Div>
            {selectedChildName}님의 대출 상한선은 <br />
            {normalizeNumber(userInfo?.loanLimit)}원입니다.
          </Div>
        </BottomDiv>
        <BottomDiv $isLast>
          <BImg src={three} />
          <Div>
            {selectedChildName}님의 투자 상한선은
            <br />
            {normalizeNumber(userInfo?.investLimit)}원입니다.
          </Div>
        </BottomDiv>
      </ColumnDiv>
    </S.Container>
  );
};

export default Home;

const ChildWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  /* gap: 5px; */
  gap: calc((100vw - 360px) / 4);
  padding-bottom: 30px;
`;

const ChildDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChildImg = styled.img`
  width: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0px;
`;

const Btn = styled.div`
  position: relative;
  width: ${(props) =>
    props.$width === 1 ? "calc(57vw - 20px)" : "calc(43vw - 20px)"};
  height: 155px;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px #c8ddff;
  margin-top: 20px;
  padding: 15px;
  font-size: 22px;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: ${(props) => (props.$isFirst ? "20px" : "0px")};
`;

const Img = styled.img`
  position: absolute;
  bottom: ${(props) => (props.$bottom ? `${props.$bottom}px` : "0")};
  right: ${(props) => (props.$right ? `${props.$right}px` : "0")};
  width: ${(props) => props.$imgwidth}px;
`;

const ColumnDiv = styled.div`
  margin-top: 20px;
`;

const BottomDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: ${(props) => (props.$isLast ? "none" : "1px solid #B0B0B0")};
`;

const BImg = styled.img`
  width: 55px;
`;

const Div = styled.div`
  margin-left: 20px;
  font-size: 20px;
  font-weight: 600;
`;
