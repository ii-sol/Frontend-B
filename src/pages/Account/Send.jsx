import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import Header from "../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";

import * as S from "../../styles/GlobalStyles";

const Send = () => {
  const navigate = useNavigate();

  const complete = () => {
    navigate("/account/complete");
  };

  return (
    <>
      <Header left={<MdArrowBackIos />} title={"돈 보내기"} />
      <div tw="flex flex-col items-center ">
        <div tw="flex flex-col items-center mt-40">
          <h2 tw="text-2xl font-semibold text-blue-500">양은수 님에게</h2>
          <p tw="text-4xl font-bold mt-2">5,000원을</p>
          <p tw="text-2xl font-semibold mt-2">보낼게요</p>
        </div>

        <div tw="flex flex-col w-full mt-64">
          <div tw="flex justify-between px-4 py-2 border-t border-b border-gray-300">
            <span>받는 분에게 표시</span>
            <span>정우성</span>
          </div>
          <div tw="flex justify-between px-4 py-2 border-b border-gray-300">
            <span>출금 계좌</span>
            <span>01024560197-01</span>
          </div>
          <div tw="flex justify-between px-4 py-2 border-b border-gray-300">
            <span>입금 계좌</span>
            <span>01012341234-01</span>
          </div>
        </div>

        <S.BottomBtn onClick={complete}>보내기</S.BottomBtn>
      </div>
    </>
  );
};

export default Send;
