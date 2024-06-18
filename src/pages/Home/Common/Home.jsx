import React from "react";
import Account from "../../../components/common/Account";
import styled from "styled-components";
import backgroundImage from "../../../assets/img/Home/mainback.svg";
import invest from "../../../assets/img/Home/invest.svg";
import allowance from "../../../assets/img/Home/allowance.svg";
import mission from "../../../assets/img/Home/mission.svg";
import loan from "../../../assets/img/Home/loan.svg";
import { useNavigate } from "react-router-dom";

const Home = ({ texts }) => {
  const navigate = useNavigate();

  const clickLoan = () => {
    navigate("/loan/main");
  };
  return (
    <Container>
      <Account accountNum={1}></Account>
      <RowDiv $isFirst>
        <Btn $width={165} onClick={clickLoan}>
          {texts[0]}
          <Img src={invest} $right={10} $imgwidth={130} />
        </Btn>
        <Btn $width={115}>
          {texts[1]}
          <br />
          {texts[2]}
          <Img src={allowance} $bottom={-10} $right={-20} $imgwidth={140} />
        </Btn>
      </RowDiv>
      <RowDiv>
        <Btn $width={115}>
          {texts[3]}
          <Img src={mission} $bottom={10} $right={5} $imgwidth={100} />
        </Btn>
        <Btn $width={165}>
          {texts[4]}
          <Img src={loan} $bottom={-20} $imgwidth={120} />
        </Btn>
      </RowDiv>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 30px 0px 30px;
  height: ${screen.height < 700 ? "123vh" : screen.height < 800 ? "115vh" : "100vh"};
  /* height: 100vh; */
  width: 100vw;
  background-color: #b6dcff;
  background-image: url(${backgroundImage});
  background-size: 105%;
`;

const Btn = styled.div`
  position: relative;
  width: ${(props) => props.$width}px;
  height: 155px;
  border-radius: 15px;
  background: #fafafa;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 15px;

  font-size: 23px;

  @media (min-width: 380px) {
    width: ${(props) => props.$width + 15}px;
  }

  @media (min-width: 400px) {
    width: ${(props) => props.$width + 25}px;
  }
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: ${(props) => `calc(${window.innerWidth}px / 20)`};
  margin-top: ${(props) => (props.$isFirst ? "40px" : "10px")};
`;

const Img = styled.img`
  position: absolute;
  bottom: ${(props) => (props.$bottom ? `${props.$bottom}px` : "0")};
  right: ${(props) => (props.$right ? `${props.$right}px` : "0")};
  width: ${(props) => props.$imgwidth}px;
`;
