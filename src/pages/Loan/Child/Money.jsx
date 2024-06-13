import React, { useState } from "react";
import tw from "twin.macro";
import piggyBank from "~/assets/img/child/piggyBank.svg"; // 이미지 파일 경로를 확인하세요.
import { useNavigate } from "react-router-dom";
import NextButton from "../../../components/Loan/NextButton";
import Keypad from "../../../components/Loan/KeyPad";

const Money = () => {
  const [amount, setAmount] = useState("0");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleButtonClick = (value) => {
    if (value === "←") {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (value === "00") {
      setAmount((prev) => (prev !== "0" ? prev + "00" : "0"));
    } else {
      setAmount((prev) => (prev === "0" ? value : prev + value));
    }
    setError("");
  };

  const handleNext = () => {
    if (parseInt(amount.replace(/,/g, ""), 10) > 1000) {
      navigate("/loan/period", { state: { amount: amount.replace(/,/g, "") } });
    } else {
      setError("1,000원 이상부터 대출이 가능합니다.");
    }
  };

  return (
    <div tw="flex flex-col justify-between h-screen">
      <header tw="mt-4">
        <p tw="text-xl text-center font-bold mb-2">얼마를 빌릴까요?</p>
        <div tw="flex justify-center">
          <img src={piggyBank} alt="Piggy Bank" tw="w-44 h-44" />
        </div>
      </header>
      <main tw="flex flex-col items-center flex-grow justify-start mt-2">
        <div tw="bg-gray-200 rounded-2xl p-2 pl-3 pr-3 flex items-center justify-center mt-2">
          <p tw="text-xl">{formatAmount(amount)} 원</p>
        </div>
        {error && <div tw="text-red-500 text-sm text-center mt-2">{error}</div>}
        <Keypad onButtonClick={handleButtonClick} />{" "}
        <div tw="mt-4">
          <NextButton onClick={handleNext} />
        </div>
      </main>
    </div>
  );
};

export default Money;
