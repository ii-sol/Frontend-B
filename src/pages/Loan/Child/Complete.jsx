import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import moneyHand from "~/assets/img/child/moneyhand.svg"; // 올바른 경로

const Complete = () => {
  const navigate = useNavigate();

  const complete = () => {
    navigate("/loan/main");
  };

  return (
    <>
      <img src={moneyHand} />
      <div>
        <p tw="text-center text-2xl font-bold">대출 신청 완료</p>
      </div>

      <div tw="flex flex-col w-10/12 h-28 bg-blue-100 mt-7 ml-9 rounded-2xl">
        <p tw="text-xl text-center pt-5">엄마</p>
        <p tw="text-xl text-center pt-2 ">1,000원</p>
      </div>
      <p tw="text-sm text-center mt-1">2024.06.01까지 응답하지 않으면 취소돼요.</p>
      <footer tw="fixed bottom-2 left-0 right-0 w-full p-4">
        <button tw="w-full bg-blue-300 p-3 text-white rounded-xl hover:bg-blue-300 font-bold text-xl" onClick={complete}>
          완료
        </button>
      </footer>
    </>
  );
};

export default Complete;
