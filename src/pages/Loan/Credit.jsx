import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import Header from "../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";
import credit from "../../assets/img/Loan/credit.svg";
import { baseInstance } from "../../services/api";
import { useSelector } from "react-redux";

const CreditScoreInfo = () => {
  const navigate = useNavigate();
  const [baseRate, setBaseRate] = useState(0); // 기본 금리
  const [loanLimit, setLoanLimit] = useState(0); // 기본 대출 한도
  const [investLimit, setInvestLimit] = useState(0); // 기본 투자 한도
  const [score, setScore] = useState(0);
  const [grad, setGrad] = useState("");
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);

  const handleLeft = () => {
    navigate("/loan/main");
  };

  useEffect(() => {
    const limitBaseUrl = `/users/child-manage/${selectedChildSn}`;
    const scoreBaseUrl = `/users/score/${selectedChildSn}`;

    const fetchCredit = async () => {
      try {
        const [creditResponse, scoreResponse] = await Promise.all([
          baseInstance.get(limitBaseUrl),
          baseInstance.get(scoreBaseUrl),
        ]);
        console.log(score);

        const baseRate = creditResponse.data.response.baseRate;
        const loanLimit = creditResponse.data.response.loanLimit;
        const investLimit = creditResponse.data.response.investLimit;
        const fetchedScore = scoreResponse.data.response;

        setBaseRate(baseRate);
        setLoanLimit(loanLimit);
        setInvestLimit(investLimit);
        setScore(fetchedScore);

        // 기준 금리와 상한 금액을 조정하는 로직
        if (fetchedScore <= 19) {
          setGrad("매우 낮음");
          setBaseRate(Math.max(baseRate + 2, 0)); // 기준 금리보다 2% 높음, 음수가 되지 않도록 설정
          setLoanLimit(Math.max(loanLimit - 100, 0)); // 기준 상한 금액보다 100만원 낮음, 음수가 되지 않도록 설정
          setInvestLimit(Math.max(investLimit - 100, 0)); // 기준 상한 금액보다 100만원 낮음, 음수가 되지 않도록 설정
        } else if (fetchedScore <= 39) {
          setGrad("낮음");
          setBaseRate(Math.max(baseRate + 1, 0)); // 기준 금리보다 1% 높음, 음수가 되지 않도록 설정
          setLoanLimit(Math.max(loanLimit - 50, 0)); // 기준 상한 금액보다 50만원 낮음, 음수가 되지 않도록 설정
          setInvestLimit(Math.max(investLimit - 50, 0)); // 기준 상한 금액보다 50만원 낮음, 음수가 되지 않도록 설정
        } else if (fetchedScore <= 59) {
          setGrad("보통");
          setBaseRate(baseRate); // 기준 금리
          setLoanLimit(loanLimit); // 기준 상한 금액
          setInvestLimit(investLimit); // 기준 상한 금액
        } else if (fetchedScore <= 79) {
          setGrad("높음");
          setBaseRate(Math.max(baseRate - 1, 0)); // 기준 금리보다 1% 낮음, 음수가 되지 않도록 설정
          setLoanLimit(loanLimit + 50); // 기준 상한 금액보다 50만원 높음
          setInvestLimit(investLimit + 50); // 기준 상한 금액보다 50만원 높음
        } else if (fetchedScore <= 100) {
          setGrad("매우 높음");
          setBaseRate(Math.max(baseRate - 2, 0)); // 기준 금리보다 2% 낮음, 음수가 되지 않도록 설정
          setLoanLimit(loanLimit + 100); // 기준 상한 금액보다 100만원 높음
          setInvestLimit(investLimit + 100); // 기준 상한 금액보다 100만원 높음
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchCredit();
  }, []);

  console.log(baseRate, investLimit, loanLimit);

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
          <h2 tw="text-2xl font-bold mb-2 text-gray-800 text-center">{grad}</h2>
          <p tw="text-gray-700 leading-relaxed">
            {loanLimit}만원까지 빌리기 요청을 할 수 있어요.
            <br />
            금리 {baseRate}%에 돈을 빌릴 수 있어요.
            <br />
            {investLimit}만원까지 투자할 수 있어요.
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
