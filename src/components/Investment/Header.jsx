import React from "react";
import tw from "twin.macro";
import { MdArrowBackIos } from "react-icons/md";
import note from "../../assets/img/Invest/note.svg";
import whitenote from "../../assets/img/Invest/whitenote.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Header = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header tw="flex justify-between items-center py-4">
      <button
        tw="text-2xl"
        onClick={() => {
          if (location.pathname === "/invest") {
            navigate("/");
          } else navigate(-1);
        }}
        style={{ width: "43.14px" }}
      >
        <MdArrowBackIos />
      </button>
      <h1 tw="text-2xl font-bold">투자</h1>
      {type ? (
        <StyledButton>
          {/* <img src={whitenote} /> */}
          <div onClick={() => navigate("/invest")}>취소</div>
        </StyledButton>
      ) : (
        <button tw="text-lg" style={{ width: "43.14px" }}>
          <img src={note} />
        </button>
      )}
    </header>
  );
};

export default Header;

const StyledButton = styled.button`
  ${tw`text-lg cursor-default`}
`;
