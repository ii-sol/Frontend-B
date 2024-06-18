import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { FiEdit2 } from "react-icons/fi";
import { FiSave } from "react-icons/fi";

import { normalizeNumber } from "../../utils/NormalizeNumber";

import Header from "~/components/common/Header";
import ChildProfile from "~/components/MyPage/ChildProfile";

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
    const { name, value } = e.target;
    if (name === "interestRate") {
      if (!/^\d*\.?\d*$/.test(value)) {
        return;
      }
    } else {
      if (!/^\d*$/.test(value)) {
        return;
      }
    }

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
              <FiSave tw="w-[18px] h-[18px]" />
            </SaveButton>
          ) : (
            <EditButton onClick={handleEditClick}>
              <FiEdit2 tw="w-[18px] h-[18px]" />
            </EditButton>
          )}
        </Management>
        <ManagementDetails>
          <DetailItem>
            <DetailLabel>기준금리</DetailLabel>
            {isEditing ? <DetailInput type="text" name="interestRate" value={formData.interestRate} onChange={handleInputChange} /> : <DetailValue>{formData.interestRate} %</DetailValue>}
          </DetailItem>
          <DetailItem>
            <DetailLabel>투자상한액</DetailLabel>
            {isEditing ? (
              <DetailInput type="text" name="investmentRepayment" value={formData.investmentRepayment} onChange={handleInputChange} />
            ) : (
              <DetailValue>{formData.investmentRepayment === 0 ? "" : normalizeNumber(formData.investmentRepayment)} 원</DetailValue>
            )}
          </DetailItem>
          <DetailItem>
            <DetailLabel>대출상한액</DetailLabel>
            {isEditing ? (
              <DetailInput type="text" name="loanRepayment" value={formData.loanRepayment} onChange={handleInputChange} />
            ) : (
              <DetailValue>{formData.loanRepayment === 0 ? "" : normalizeNumber(formData.loanRepayment)} 원</DetailValue>
            )}
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
  w-1/2
  border
  rounded
  p-1
  `}
  font-size: 18px;
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
