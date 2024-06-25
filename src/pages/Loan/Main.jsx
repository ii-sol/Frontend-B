import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LoanCard from "../../components/Loan/LoanCard.jsx";
import RequestCard from "../../components/Loan/RequestCard.jsx";
import Header from "../../components/common/Header.jsx";
import { styled } from "styled-components";
import EmptyImage from "~/assets/img/common/empty.svg";
import { baseInstance } from "../../services/api.jsx";
import { useSelector } from "react-redux";

const Main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const [loans, setLoans] = useState([]);
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
  const selectedChildName = useSelector(
    (state) => state.user.selectedChildName
  );
  const [baseRate, setBaseRate] = useState(3);
  const [grad, setGrad] = useState("보통");
  const [score, setScore] = useState(50);

  useEffect(() => {
    if (selectedChildSn) {
      fetchLoans(selectedChildSn);
      fetchScore(selectedChildSn);
    }
  }, [selectedChildSn]);

  const fetchLoans = async (childSn) => {
    try {
      const response = await baseInstance.get(`/loan/${childSn}`);
      setLoans(response.data.response || []);
    } catch (error) {
      console.error("Failed to fetch loans", error);
    }
  };

  const fetchScore = async (childSn) => {
    try {
      const creditResponse = await baseInstance.get(
        `/users/child-manage/${childSn}`
      );
      const baseRate1 = creditResponse.data.response.baseRate || 3;

      setBaseRate(baseRate1);

      const scoreResponse = await baseInstance.get(`/users/score/${childSn}`);
      const fetchedScore = scoreResponse.data.response || 0;

      setScore(fetchedScore);

      if (fetchedScore <= 19) {
        setGrad("매우 낮음");
        setBaseRate(Math.max(baseRate1 + 2, 0)); // 기준 금리보다 2% 높음
      } else if (fetchedScore <= 39) {
        setGrad("낮음");
        setBaseRate(Math.max(baseRate1 + 1, 0)); // 기준 금리보다 1% 높음
      } else if (fetchedScore <= 59) {
        setGrad("보통");
        setBaseRate(baseRate1); // 기준 금리
      } else if (fetchedScore <= 79) {
        setGrad("높음");
        setBaseRate(Math.max(baseRate1 - 1, 0)); // 기준 금리보다 1% 낮음
      } else if (fetchedScore <= 100) {
        setGrad("매우 높음");
        setBaseRate(Math.max(baseRate1 - 2, 0)); // 기준 금리보다 2% 낮음
      }
    } catch (error) {
      console.error("Failed to fetch score", error);
    }
  };

  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  const handleCreateLoan = () => {
    navigate("/loan/who");
  };

  const handleHistory = () => {
    navigate("/loan/history");
  };

  const handleProgress = (loanId) => {
    navigate(`/loan/detailOnGoing/${loanId}`);
  };

  const handleRequestProgress = (loanId) => {
    navigate(`/loan/detail/${loanId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, "")
      .replace(/\s/g, ".");
  };

  const calculateDday = (createDate) => {
    const now = new Date();
    const created = new Date(createDate);
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return 3 - diffDays;
  };

  const handleLeftClick = () => {
    navigate("/");
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div tw="flex flex-col h-screen">
      <Header
        left={<MdArrowBackIos />}
        title={"빌려주기"}
        onLeftClick={handleLeftClick}
        right={"신뢰도"}
        onRightClick={() => navigate("/loan/credit")}
      />
      <main tw="flex flex-col flex-1 justify-start space-y-4 mt-1">
        {/* Credit Score */}
        <div
          tw="flex flex-col items-center justify-center bg-blue-400 w-full rounded-2xl p-4 shadow-md"
          onClick={handleSelect}
        >
          {!isSelected ? (
            <>
              <div tw="flex items-center justify-center text-center">
                <p tw="text-lg text-white font-bold">
                  현재 {selectedChildName} 신뢰도는?
                </p>
              </div>
              <p tw="text-4xl font-bold mt-2 text-white text-center">{grad}</p>
            </>
          ) : (
            <>
              <div tw="flex items-center justify-center text-center">
                <p tw="text-lg text-white font-bold">
                  현재 {selectedChildName}의 금리는?
                </p>
              </div>
              <p tw="text-4xl font-bold mt-2 text-white text-center">
                {baseRate}%
              </p>
            </>
          )}
        </div>
        <Container tw="w-full rounded-2xl p-2">
          <Slider {...sliderSettings}>
            {loans
              .filter((loan) => loan.status == 1)
              .map((loan) => (
                <RequestCard
                  key={loan.id}
                  status={loan.status}
                  name={loan.childName}
                  title={loan.title}
                  dday={calculateDday(loan.createDate)}
                  onClick={() => handleRequestProgress(loan.id)}
                />
              ))}
          </Slider>
        </Container>
        {/* Loan History Header */}
        <div tw="flex justify-between items-center w-full">
          <p tw="text-lg font-bold">내가 빌려준 돈</p>
          <button onClick={handleHistory}>지난 기록 &gt;</button>
        </div>
        {/* Loan History */}
        {loans.length === 0 ? (
          <EmptyState>
            <Img src={EmptyImage} alt="No data" />
            <EmptyText>대출 신청 내역이 없어요</EmptyText>
          </EmptyState>
        ) : (
          <div tw="grid grid-cols-2 gap-5 w-full">
            {loans
              .filter((loan) => loan.status === 3)
              .map((loan) => (
                <LoanCard
                  key={loan.id}
                  amount={loan.amount}
                  period={`${formatDate(loan.createDate)} ~ ${formatDate(
                    loan.dueDate
                  )}`}
                  title={loan.title}
                  totalAmount={loan.balance}
                  onClick={() => handleProgress(loan.id)}
                />
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Main;

const Container = styled.div`
  .slick-prev:before,
  .slick-next:before {
    font-family: "slick";
    font-size: 20px;
    line-height: 1;
    opacity: 0.75;
    color: #97b2dd;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before {
    opacity: 0.2;
  }
`;

const EmptyState = styled.div`
  ${tw`flex flex-col items-center justify-center h-full`}
`;

const Img = styled.img`
  ${tw`w-40 h-40`}
`;

const EmptyText = styled.p`
  ${tw`mt-4 text-lg text-gray-500`}
`;
