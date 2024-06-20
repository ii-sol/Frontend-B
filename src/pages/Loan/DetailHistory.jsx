import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import tw from "twin.macro";
import Header from "../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";

const LoanDetailHistory = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const [loanDetail, setLoanDetail] = useState(null);
  const [totalInterest, setTotalInterest] = useState(0);
  const [repaymentPlan, setRepaymentPlan] = useState([]);

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleLeftClick = () => {
    navigate("/loan/main");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA"); // en-CA locale formats date as YYYY-MM-DD
  };

  const calculateEqualInstallments = (amount, rate, period) => {
    const monthlyInterestRate = rate / 12 / 100;
    const installmentAmount =
      (amount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, period))) /
      (Math.pow(1 + monthlyInterestRate, period) - 1);
    return Math.round(installmentAmount);
  };

  const calculateRepaymentPlan = (amount, rate, period) => {
    const monthlyInterestRate = rate / 12 / 100;
    const installmentAmount = calculateEqualInstallments(amount, rate, period);
    const repaymentPlan = [];

    for (let i = 1; i <= period; i++) {
      const interest = Math.round(amount * monthlyInterestRate);
      const principal = installmentAmount - interest;
      amount -= principal;

      repaymentPlan.push({
        installment: i,
        principal: principal,
        interest: interest,
        totalRepayment: installmentAmount,
        remainingPrincipal: Math.max(amount, 0),
      });
    }

    return repaymentPlan;
  };

  useEffect(() => {
    if (loanId !== undefined) {
      const fetchLoanDetail = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8082/loan/detail/${loanId}`
          );
          const data = response.data.response;

          console.log(data);

          setLoanDetail(data);

          const plan = calculateRepaymentPlan(
            data.amount,
            data.interestRate,
            data.period
          );
          setRepaymentPlan(plan);
          setTotalInterest(plan.reduce((acc, cur) => acc + cur.interest, 0));
        } catch (error) {
          console.error("Failed to fetch loan detail", error);
        }
      };

      fetchLoanDetail();
    }
  }, [loanId]);

  const handleRepaymentCompletion = () => {
    // Handle the repayment completion logic here
  };

  if (!loanDetail) {
    return <div>Loading...</div>;
  }

  const {
    amount,
    period,
    interestRate,
    createDate,
    dueDate,
    title,
    message,
    parentName,
  } = loanDetail;

  return (
    <>
      <Header
        left={<MdArrowBackIos />}
        title={"상세 정보"}
        onLeftClick={handleLeftClick}
      />
      <div tw="flex flex-col h-screen">
        <main tw="flex flex-col items-center rounded-2xl">
          <div tw="text-center">
            <p tw="text-2xl font-bold text-gray-600">{title}</p>
            <p tw="text-4xl font-bold mt-2">{formatAmount(amount)}원</p>
          </div>

          <div tw="bg-blue-100 rounded-2xl p-4 mt-6 w-full shadow-lg">
            <p tw="text-left font-bold">To. {parentName}</p>
            <p tw="mt-2 text-gray-700">{message}</p>
          </div>

          <section tw="mt-6 w-full">
            <h3 tw="text-lg font-bold text-gray-800">대출 상세 정보</h3>
            <div tw="bg-blue-100 rounded-2xl p-4 mt-2 shadow-md">
              <p tw="flex justify-between text-gray-700">
                <span>빌린 금액</span>
                <span>{formatAmount(amount)}원</span>
              </p>
              <p tw="flex justify-between mt-2 text-gray-700">
                <span>빌린 기간</span>
                <span>{period}개월</span>
              </p>
              <p tw="flex justify-between mt-2 text-gray-700">
                <span>총 이자</span>
                <span>{formatAmount(totalInterest)}원</span>
              </p>
              <p tw="flex justify-between mt-2 text-gray-700">
                <span>이자률</span>
                <span>{interestRate}%</span>
              </p>
              <p tw="flex justify-between mt-2 text-gray-700">
                <span>빌린 날</span>
                <span>{formatDate(createDate)}</span>
              </p>
              <p tw="flex justify-between mt-2 text-gray-700">
                <span>모두 갚는 날</span>
                <span>{formatDate(dueDate)}</span>
              </p>
            </div>
          </section>

          <section tw="mt-6 w-full mb-6">
            <h3 tw="text-lg font-bold text-gray-800">상환 계획</h3>
            <div tw="bg-white rounded-2xl shadow-md overflow-hidden mt-2">
              <table tw="w-full border-collapse">
                <thead>
                  <tr tw="bg-blue-200 text-right text-sm">
                    <th tw="border border-gray-300 p-2 text-sm">회차</th>
                    <th tw="border border-gray-300 p-2 text-sm">월상환금</th>
                    <th tw="border border-gray-300 p-2 text-sm">대출잔금</th>
                    <th tw="border border-gray-300 p-2 text-sm">상환여부</th>
                    <th tw="border border-gray-300 p-2 text-sm">연체여부</th>
                  </tr>
                </thead>
                <tbody tw="text-right">
                  {repaymentPlan.map((item) => (
                    <tr key={item.installment} tw="hover:bg-gray-100">
                      <td tw="border border-gray-300 p-2">
                        {item.installment}
                      </td>
                      <td tw="border border-gray-300 p-2 text-green-500">
                        {formatAmount(item.totalRepayment)}
                      </td>
                      <td tw="border border-gray-300 p-2">
                        {formatAmount(item.remainingPrincipal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default LoanDetailHistory;
