import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import tw from "twin.macro";
import Header from "../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";
import * as S from "../../styles/GlobalStyles";
import SpaceSolImg from "~/assets/img/Account/spaceSol.svg";
import { store } from "../../store/stores";
import { setReceiverAccountNum } from "../../store/reducers/Account/account";

const SelectAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    let formattedValue = "";

    if (value.length <= 3) {
      formattedValue = value;
    } else if (value.length <= 7) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length <= 11) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(
        7
      )}`;
    } else {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(
        7,
        11
      )}-${value.slice(11, 13)}`;
    }

    setPhoneNumber(formattedValue);
  };

  const complete = () => {
    if (phoneNumber.replace(/-/g, "").length !== 13) {
      setErrorMessage("형식에 맞지 않는 계좌번호 입니다.");
    } else {
      dispatch(setReceiverAccountNum(phoneNumber));
      console.log(store.getState());
      navigate("/account/money");
    }
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
      <div
        tw="flex flex-col items-center gap-7"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <div tw="flex flex-col items-center mt-4 gap-7">
          <h2 tw="text-2xl font-semibold">누구에게 보낼래요?</h2>
          <img src={SpaceSolImg} alt="Money Hand" tw="w-[50%]" />
        </div>
        <div tw="flex flex-col items-center w-full mt-6">
          <div tw="w-full p-3 rounded-2xl border border-blue-300 bg-blue-100 text-xl">
            <label htmlFor="phoneNumber" tw="p-4">
              계좌번호
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              tw="w-11/12 mt-2 ml-2 p-2 border-none text-xl rounded bg-blue-100"
              placeholder="000-0000-0000-00"
            />
          </div>
          {errorMessage && <p tw="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </div>
        <S.BottomBtn onClick={complete}>다음</S.BottomBtn>
      </div>
    </>
  );
};

export default SelectAccount;
