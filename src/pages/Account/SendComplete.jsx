import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import moneyHand from "~/assets/img/Account/billmoney.svg";
import Header from "../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";

import * as S from "../../styles/GlobalStyles";
import CompleteImg from "~/assets/img/Account/happyFriends.svg";

const SendMoneyComplete = () => {
  const navigate = useNavigate();

  const complete = () => {
    navigate("/");
  };

  return (
    <>
      <Header left={<MdArrowBackIos />} title={"돈 보내기"} />
      <div tw="flex flex-col items-center justify-center" style={{ height: "calc(100vh - 150px)" }}>
        <div tw="flex flex-col items-center">
          <img src={CompleteImg} alt="Complete" tw="w-[60%]" />
          <h2 tw="text-2xl font-semibold mt-4">돈 보내기 완료</h2>
        </div>

        <div tw="flex flex-col items-center w-full mt-12 bg-blue-100 rounded-2xl p-4">
          <h3 tw="text-2xl font-bold">양은수 님</h3>
          <p tw="text-3xl font-bold text-blue-500 mt-2">5,000원</p>
          <p tw="text-xl mt-2 text-gray-600">잔액: 150,000원</p>
        </div>

        <S.BottomBtn onClick={complete}>완료</S.BottomBtn>
      </div>
    </>
  );
};

export default SendMoneyComplete;
