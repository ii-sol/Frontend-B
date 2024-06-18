import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";

const LoanDetail = () => {
  const navigate = useNavigate();

  const loanAmount = 200000;
  const loanPeriod = 9; // in months
  const interestRate = 4.5 / 100; // annual interest rate
  const applicationDate = "2024-06-03";
  const maturityDate = "2024-11-03";

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateEqualInstallments = (amount, rate, period) => {
    const monthlyInterestRate = rate / 12;
    const installmentAmount =
      (amount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, period))) /
      (Math.pow(1 + monthlyInterestRate, period) - 1);
    return Math.round(installmentAmount);
  };

  const calculateRepaymentPlan = (amount, rate, period) => {
    const monthlyInterestRate = rate / 12;
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

  const [totalInterest, setTotalInterest] = useState(0);
  const [repaymentPlan, setRepaymentPlan] = useState([]);

  useEffect(() => {
    const plan = calculateRepaymentPlan(loanAmount, interestRate, loanPeriod);
    setRepaymentPlan(plan);
    setTotalInterest(plan.reduce((acc, cur) => acc + cur.interest, 0));
  }, []);

  const handleRepaymentCompletion = () => {
    // Handle the repayment completion logic here
  };

  return (
    <div tw="flex flex-col h-screen p-4">
      <main tw="flex flex-col items-center bg-white rounded-2xl p-6">
        <div tw="text-center">
          <p tw="text-lg text-gray-600">D-48</p>
          <p tw="text-4xl font-bold mt-2">{formatAmount(loanAmount)}원</p>
        </div>

        <div tw="bg-blue-100 rounded-2xl p-4 mt-6 w-full shadow-lg">
          <p tw="text-left font-bold">To. 엄마</p>
          <p tw="mt-2 text-gray-700">자전거가 너무 사고 싶어요</p>
        </div>

        <section tw="mt-6 w-full">
          <h3 tw="text-lg font-bold text-gray-800">대출 상세 정보</h3>
          <div tw="bg-blue-100 rounded-2xl p-4 mt-2 shadow-md">
            <p tw="flex justify-between text-gray-700">
              <span>대출 금액</span>
              <span>{formatAmount(loanAmount)}원</span>
            </p>
            <p tw="flex justify-between mt-2 text-gray-700">
              <span>대출 기간</span>
              <span>{loanPeriod}개월</span>
            </p>
            <p tw="flex justify-between mt-2 text-gray-700">
              <span>총 대출 이자</span>
              <span>{formatAmount(totalInterest)}원</span>
            </p>
            <p tw="flex justify-between mt-2 text-gray-700">
              <span>대출 금리</span>
              <span>4.5%</span>
            </p>
            <p tw="flex justify-between mt-2 text-gray-700">
              <span>신청일</span>
              <span>{applicationDate}</span>
            </p>
            <p tw="flex justify-between mt-2 text-gray-700">
              <span>만기일</span>
              <span>{maturityDate}</span>
            </p>
          </div>
        </section>

        <section tw="mt-6 w-full">
          <h3 tw="text-lg font-bold text-gray-800">상환 계획</h3>
          <div tw="bg-white rounded-2xl shadow-md overflow-hidden mt-2">
            <table tw="w-full border-collapse">
              <thead>
                <tr tw="bg-blue-200 text-right">
                  <th tw="border border-gray-300 p-2 text-sm">회차</th>
                  <th tw="border border-gray-300 p-2 text-sm">납입원금</th>
                  <th tw="border border-gray-300 p-2 text-sm">대출이자</th>
                  <th tw="border border-gray-300 p-2 text-sm">월상환금</th>
                  <th tw="border border-gray-300 p-2 text-sm">대출잔금</th>
                </tr>
              </thead>
              <tbody tw="text-right">
                {repaymentPlan.map((item) => (
                  <tr key={item.installment} tw="hover:bg-gray-100">
                    <td tw="border border-gray-300 p-2">{item.installment}</td>
                    <td tw="border border-gray-300 p-2">
                      {formatAmount(item.principal)}
                    </td>
                    <td tw="border border-gray-300 p-2">
                      {formatAmount(item.interest)}
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

        <button
          tw="bg-blue-500 text-white py-2 px-4 rounded-2xl mt-6 w-full max-w-md"
          onClick={handleRepaymentCompletion}
        >
          상환 완료
        </button>
      </main>
    </div>
  );
};

export default LoanDetail;
