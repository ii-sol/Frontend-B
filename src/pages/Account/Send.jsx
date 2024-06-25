import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import tw from "twin.macro";
import Header from "../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";
import * as S from "../../styles/GlobalStyles";

const Send = () => {
  const navigate = useNavigate();

  const receiverAccountNum = useSelector(
    (state) => state.account.receiverAccountNum
  );
  const amounts = useSelector((state) => state.account.amounts);

  const complete = () => {
    navigate("/account/complete");
  };

  return (
    <>
      <Header
        left={<MdArrowBackIos />}
        title={"돈 보내기"}
        onLeftClick={() => navigate("/")}
      />
      <div tw="flex flex-col items-center ">
        <div tw="flex flex-col items-center mt-40">
          <p tw="text-4xl font-bold mt-2">
            {amounts ? amounts.toLocaleString() : 0}
            원을
          </p>
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
            <span>
              {receiverAccountNum
                ? `${receiverAccountNum.slice(
                    0,
                    11
                  )}-${receiverAccountNum.slice(-2)}`
                : ""}
            </span>
          </div>
        </div>

        <S.BottomBtn onClick={complete}>보내기</S.BottomBtn>
      </div>
    </>
  );
};

export default Send;
