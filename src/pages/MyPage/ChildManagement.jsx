import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import Header from "~/components/common/Header";
import ChildProfile from "~/components/MyPage/parent/ChildProfile";

const ChildManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    interestRate: "",
    investmentRepayment: "",
    loanRepayment: "",
  });

  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/mypage");
  };

  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSaveClick = () => {
    if (isEditing) {
      setIsEditing(false);
      // TODO: 저장 로직 추가
    }
    9;
  };

  const handleDeleteClick = () => {
    // TODO: 삭제 로직 추가
    alert("아이 삭제 완료");
  };

  const handleInputChange = (e) => {
    // TODO: 예외처리
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <S.Container>
      <Header onLeftClick={handleLeftClick} title={"아이 관리"} right={""} />

      <S.StepWrapper>
        <ChildProfile />
        <Management>
          <S.Phrase>아이 관리</S.Phrase>
          {isEditing ? (
            <SaveButton onClick={handleSaveClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5L9 16.5L19 6.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SaveButton>
          ) : (
            <EditButton onClick={handleEditClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 8.23992L7.24 20.9999H3V16.7599L15.76 3.99992C16.3225 3.43812 17.085 3.12256 17.88 3.12256C18.675 3.12256 19.4375 3.43812 20 3.99992V3.99992C20.5618 4.56242 20.8774 5.32492 20.8774 6.11992C20.8774 6.91492 20.5618 7.67742 20 8.23992Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </EditButton>
          )}
        </Management>
        <ManagementDetails>
          <DetailItem>
            <DetailLabel>기준금리</DetailLabel>
            {isEditing ? <DetailInput type="text" name="interestRate" value={formData.interestRate} onChange={handleInputChange} /> : <DetailValue>{formData.interestRate} %</DetailValue>}
          </DetailItem>
          <DetailItem>
            <DetailLabel>투자상환액</DetailLabel>
            {isEditing ? (
              <DetailInput type="text" name="investmentRepayment" value={formData.investmentRepayment} onChange={handleInputChange} />
            ) : (
              <DetailValue>{formData.investmentRepayment} 원</DetailValue>
            )}
          </DetailItem>
          <DetailItem>
            <DetailLabel>대출상환액</DetailLabel>
            {isEditing ? <DetailInput type="text" name="loanRepayment" value={formData.loanRepayment} onChange={handleInputChange} /> : <DetailValue>{formData.loanRepayment} 원</DetailValue>}
          </DetailItem>
        </ManagementDetails>
        <DeleteButton onClick={handleDeleteClick}>아이 삭제</DeleteButton>
      </S.StepWrapper>
    </S.Container>
  );
};

export default ChildManagement;

const Management = styled.div`
  ${tw`
  flex
  mb-2
  items-center
  justify-between
  `}
`;

const ManagementDetails = styled.div`
  ${tw`
  flex
  flex-col
  gap-4
  p-7
  rounded-lg
  shadow-md
  `}
  font-size: 18px;
  font-weight: 700;
  background-color: #f4f9ff;
`;

const DetailItem = styled.div`
  ${tw`
  flex
  justify-between
  `}
`;

const DetailLabel = styled.span`
  ${tw`
  font-medium
  `}
`;

const DetailValue = styled.span`
  ${tw`
  `}
`;

const DetailInput = styled.input`
  ${tw`
  border
  rounded
  p-1
  `}
`;

const EditButton = styled.button`
  ${tw`
    border-none
    cursor-pointer
  `}
`;

const SaveButton = styled.button`
  ${tw`
    border-none
    cursor-pointer
  `}
`;

const DeleteButton = styled.button`
  ${tw`
  p-2
  w-auto
  rounded-lg
  border-none
  cursor-pointer
  `}
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #ff5959;
  font-size: 18px;
  font-weight: 700;
`;
