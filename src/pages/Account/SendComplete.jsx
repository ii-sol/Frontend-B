import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import tw from "twin.macro";
import Header from "../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";
import * as S from "../../styles/GlobalStyles";
import CompleteImg from "~/assets/img/Account/happyFriends.svg";
import { baseInstance } from "../../services/api";

const SendMoneyComplete = () => {
  const balance = useSelector((state) => state.account.balance1);
  const navigate = useNavigate();
  const receiverAccountNum = useSelector(
    (state) => state.account.receiverAccountNum
  );
  const amounts = useSelector((state) => state.account.amounts);
  const [error, setError] = React.useState(null);

  const formatAmount = (amount) => {
    if (!amount) return "0";
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const fetchAccount = async () => {
      const baseUrl = "/account/transmit";
      try {
        const res = await baseInstance.post(baseUrl, {
          receiverAccountNum,
          sendStatus: 3,
          amount: amounts,
        });
        console.log(res);
      } catch (error) {
        const errorMsg = error.response?.data?.error || "계좌이체 실패";
        setError(errorMsg);
        console.error("계좌이체 실패", error);
      }
    };

    if (receiverAccountNum && amounts) {
      fetchAccount();
    }
  }, [receiverAccountNum, amounts]);

  const complete = () => {
    navigate("/");
  };

  if (error) {
    return (
      <div
        tw="flex flex-col items-center justify-center"
        style={{ height: "calc(100vh - 150px)" }}
      >
        <Header
          left={<MdArrowBackIos />}
          title={"돈 보내기"}
          onLeftClick={() => navigate("/")}
        />
        <div tw="flex flex-col items-center mt-4">
          <h2 tw="text-2xl font-semibold text-red-500">오류 발생</h2>
          <p tw="text-lg mt-4">{error}</p>
          <S.BottomBtn onClick={complete}>홈으로 가기</S.BottomBtn>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header
        left={<MdArrowBackIos />}
        title={"돈 보내기"}
        onLeftClick={() => navigate("/")}
      />
      <div
        tw="flex flex-col items-center justify-center"
        style={{ height: "calc(100vh - 150px)" }}
      >
        <div tw="flex flex-col items-center">
          <img src={CompleteImg} alt="Complete" tw="w-[60%]" />
          <h2 tw="text-2xl font-semibold mt-4">돈 보내기 완료</h2>
        </div>

        <div tw="flex flex-col items-center w-full mt-12 bg-blue-100 rounded-2xl p-4">
          <p tw="text-3xl font-bold text-blue-500 mt-2">
            {formatAmount(amounts)}원
          </p>
          <p tw="text-xl mt-2 text-gray-600">
            잔액: {formatAmount(balance - amounts)}원
          </p>
        </div>

        <S.BottomBtn onClick={complete}>완료</S.BottomBtn>
      </div>
    </>
  );
};

export default SendMoneyComplete;
