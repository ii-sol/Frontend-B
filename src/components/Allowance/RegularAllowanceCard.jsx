import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import { deleteRegularAllowance } from "../../services/allowance";
import { useSelector, useDispatch } from "react-redux";

import { normalizeNumber } from "../../utils/normalizeNumber";

const RegularAllowanceCard = () => {
  const navigate = useNavigate();

  const csn = useSelector((state) => state.user.selectedChildSn);
  const regularAllowance = useSelector((state) => state.allowance.regularAllowance);

  // useEffect(() => {
  //   if (regularAllowance && regularAllowance.length > 0) {
  //     startDate = `${regularAllowance[0].createDate[0]}-${regularAllowance[0].createDate[1]}-${regularAllowance[0].createDate[2]}`;
  //   }
  // }, [regularAllowance]);

  const handleRegisterClick = () => {
    navigate("/allowance/registration");
  };

  // const handleUpdateClick = (id, createDate) => {
  //   navigate("/allowance/update", { state: { id, createDate } });
  // };

  const handleDeleteClick = async (id) => {
    try {
      await deleteRegularAllowance(id, csn);
      dispatch(deleteRegularAllowance());
      alert("정기 용돈이 성공적으로 삭제되었습니다.");
      navigate("/allowance");

      
    } catch (error) {
      console.error("Error creating regular allowance:", error);
      alert("정기 용돈 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  if (!regularAllowance || regularAllowance.length === 0) {
    return (
      <RegisterButton onClick={handleRegisterClick}>
        <span tw="text-[#346BAC]">정기용돈</span>등록하기
      </RegisterButton>
    );
  }

  const startDate = `${regularAllowance[0].createDate[0]}-${regularAllowance[0].createDate[1]}-${regularAllowance[0].createDate[2]}`;

  return (
    <Container key={regularAllowance[0].id}>
      <Content>
        <PeriodTag status={regularAllowance[0].period}>{regularAllowance[0].period}개월</PeriodTag>
        <Allowance>{normalizeNumber(regularAllowance[0].amount)}원</Allowance>
        <Period>
          {regularAllowance[0].createDate[0]}.{regularAllowance[0].createDate[1]}.{regularAllowance[0].createDate[2]} ~ {regularAllowance[0].dueDate[0]}.{regularAllowance[0].dueDate[1]}.{regularAllowance[0].dueDate[2]}
        </Period>
      </Content>
      <ButtonWrapper>
        {/* <Button onClick={() => handleUpdateClick(regularAllowance[0].id, startDate)}>변경하기 {regularAllowance[0].createDate[0]}</Button> `${regularAllowance[0].createDate[0]}-${regularAllowance[0].createDate[1]}-${regularAllowance[0].createDate[2]}`) */}
        <Button>변경하기</Button> 
        <Button onClick={() => handleDeleteClick(regularAllowance[0].id)}>해지하기</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default RegularAllowanceCard;

const Container = styled.div`
  ${tw`
  flex
  p-5
  gap-1
  w-full
  mb-4
  `}
  height: 128px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
  background-color: white;
`;

const RegisterButton = styled.button`
  ${tw`
  flex
  flex-col
  justify-center
  items-center
  p-5
  w-full
  mb-4
  `}
  height: 128px;
  border-radius: 20px;
  background-color: rgba(151, 178, 221, 0.4);
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
  font-size: 20px;
  font-weight: 700;
`;

const Content = styled.div`
  ${tw`
  flex
  flex-col
  items-start
  gap-1
  `}
`;

const PeriodTag = styled.div`
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
  color: #346bac;
  background-color: #d5e0f1;
`;

const Allowance = styled.div`
  color: #154b9b;
  font-size: 17px;
  font-weight: 700;
`;

const Period = styled.div`
  font-size: 12px;
`;

const ButtonWrapper = styled.div`
  ${tw`flex flex-col h-full justify-center items-end gap-3 ml-auto`}
`;

const Button = styled.button`
  background: #f4f9ff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  width: 80px;
  height: 27px;
  &:hover {
    background-color: rgba(151, 178, 221, 0.4);
  }
`;
