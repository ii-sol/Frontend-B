import React from "react";
import tw from "twin.macro";
import { MdArrowBackIos } from "react-icons/md";
import note from "../../assets/img/Invest/note.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Header = ({ type, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Container>
      <Left
        tw="text-2xl"
        onClick={() => {
          if (location.pathname === "/invest") {
            navigate("/");
          } else navigate(-1);
        }}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <MdArrowBackIos />
      </Left>
      <Title>{title ? title : "투자"}</Title>
      {type ? (
        <Right
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <img src={whitenote} /> */}
          <div onClick={() => navigate("/invest")}>취소</div>
        </Right>
      ) : (
        <Right
          onClick={() => navigate("/invest/history")}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={note} />
        </Right>
      )}
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
