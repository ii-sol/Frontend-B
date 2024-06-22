import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import Header from "../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";
import credit from "../../assets/img/Loan/credit.svg";

const CreditScoreInfo = () => {
  const navigate = useNavigate();

  const handleLeft = () => {
    navigate("/loan/main");
  };

  return (
    <>
      <Header
        left={<MdArrowBackIos />}
        title={"신뢰도 산출 방법"}
        onLeftClick={handleLeft}
      />
      <div tw="flex flex-col items-center h-screen">
        <img src={credit} tw="mt-6 w-10/12" />

        <div tw="w-full mt-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md text-center">
          <h2 tw="text-2xl font-bold mb-2 text-gray-800 text-center">보통</h2>
          <p tw="text-gray-700 leading-relaxed">
            100만원까지 빌리기 요청을 할 수 있어요.
            <br />
            금리 4.5%에 돈을 빌릴 수 있어요.
            <br />
            100만원까지 투자할 수 있어요.
          </p>
        </div>

        <div tw="w-full mt-6">
          <h3 tw="text-2xl font-bold mb-3 text-gray-800">신뢰도 점수</h3>
          <ul>
            <li tw="flex items-center mb-3">
              <div tw="bg-green-200 text-green-800 font-semibold rounded-full w-20 h-8 flex items-center justify-center mr-3">
                용돈
              </div>
              <p tw="text-gray-700">
                용돈 조르기를 하면 1점이{" "}
                <span tw="text-blue-500">떨어져요</span>
              </p>
            </li>
            <li tw="flex items-center mb-3">
              <div tw="bg-yellow-200 text-yellow-800 font-semibold rounded-full w-20 h-8 flex items-center justify-center mr-3">
                미션
              </div>
              <p tw="text-gray-700">
                미션을 수행하면 1점이 <span tw="text-red-500">올라요</span>
              </p>
            </li>
            <li tw="flex items-center mb-3">
              <div tw="bg-pink-200 text-pink-800 font-semibold rounded-full w-20 h-8 flex items-center justify-center mr-3">
                대출
              </div>
              <p tw="text-gray-700">
                대출 상환하면 5점이 <span tw="text-red-500">올라요</span>
                <br />
                대출이 연체되면 일마다 1점이{" "}
                <span tw="text-blue-500">떨어져요</span>
              </p>
            </li>
            <li tw="flex items-center mb-3">
              <div tw="bg-purple-200 text-purple-800 font-semibold rounded-full w-20 h-8 flex items-center justify-center mr-3">
                투자
              </div>
              <p tw="text-gray-700">
                전체 수익률이 +10%가 되면 5점이{" "}
                <span tw="text-red-500">올라요</span>
                <br />
                전체 수익률이 -10%가 되면 5점이{" "}
                <span tw="text-blue-500">떨어져요</span>
              </p>
            </li>
          </ul>
        </div>

        <div tw="w-full mt-6 p-4 border border-red-300 rounded-lg bg-white shadow-md text-center">
          <h3 tw="text-xl font-bold mb-2 text-red-600">이런 것은 주의해요!</h3>
          <p tw="text-gray-700 leading-relaxed">
            <span tw="text-red-500">용돈 조르기</span> 대신{" "}
            <span tw="text-black">계획적</span>으로 용돈을 사용해요
            <br />
            <span tw="text-red-500">대출</span> 받았다면{" "}
            <span tw="text-black">약속한 날짜</span>에 돈을 갚아야해요!
            <br />
            <span tw="text-red-500">투자</span>는 돈을 잃을 수 있으니{" "}
            <span tw="text-black">신중</span>하게 결정해요!
          </p>
        </div>
      </div>
    </>
  );
};

export default CreditScoreInfo;
