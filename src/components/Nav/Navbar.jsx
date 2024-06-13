import React from "react";
import { styled } from "styled-components";
import alert from "../../assets/img/Home/alert.svg";
import mypage from "../../assets/img/Home/mypage.svg";

const Navbar = () => {
  return (
    <Container>
      <div>
        <Img src={alert}></Img>
      </div>
      <div></div>
      <div>
        <Img src={mypage}></Img>
      </div>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 90px;
  background-color: white;
  border-radius: 15px 15px 0px 0px;
  background: var(--color-ui-0, #fff);
  box-shadow: 0px 0px 5px 0px rgba(163, 211, 255, 0.25);
`;

const Img = styled.img``;
