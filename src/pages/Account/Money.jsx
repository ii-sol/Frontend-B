import React, { useState } from "react";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Keypad from "../../components/Loan/KeyPad";
import NextButton from "../../components/Loan/NextButton";
import Header from "../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";
import SolImage from "~/assets/img/common/curiousSol.svg";
import { setAmounts } from "../../store/reducers/Account/account";
import { useSelector } from "react-redux";

const AccountMoney = () => {
  const [amount, setAmount] = useState("0");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.account.balance1);

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
    const numericAmount = parseInt(amount.replace(/,/g, ""), 10);
    if (numericAmount > 0) {
      dispatch(setAmounts(numericAmount));
      if (balance > numericAmount) {
        navigate("/account/send");
      } else {
        setError("이체 금액이 현재 잔고를 초과했습니다.");
      }
    } else {
      setError("금액을 입력해주세요.");
    }
  };

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <Header
        left={<MdArrowBackIos />}
        title={"돈 보내기"}
        onLeftClick={() => {
          navigate("/");
        }}
      />
      <div tw="flex flex-col gap-7" style={{ height: "calc(100vh - 60px)" }}>
        <div tw="flex flex-col items-center mt-4 gap-7">
          <h2 tw="text-2xl font-semibold">얼마를 보낼래요?</h2>
          <img src={SolImage} alt="Money Hand" tw="w-[40%]" />
        </div>
        <main tw="flex flex-col items-center flex-grow justify-start mt-2">
          <div tw="bg-gray-200 rounded-2xl p-2 pl-3 pr-3 flex items-center justify-center mt-2">
            <p tw="text-xl">{formatAmount(amount)} 원</p>
          </div>
          {error && (
            <div tw="text-red-500 text-sm text-center mt-2">{error}</div>
          )}
          <Keypad onButtonClick={handleButtonClick} />
          <div tw="mt-4">
            <NextButton onClick={handleNext} />
          </div>
        </main>
      </div>
    </>
  );
};

export default AccountMoney;
