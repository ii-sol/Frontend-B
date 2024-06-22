import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { FiEdit2 } from "react-icons/fi";
import { FiSave } from "react-icons/fi";
import { deleteChild } from "../../services/user";
import removeChildFromFamily from "../../store/reducers/common/family";
import { fetchChildManagementInfo, updateChildManagementInfo } from "../../services/user";
import { setFormData } from "../../store/reducers/common/management";

import { normalizeNumber } from "../../utils/NormalizeNumber";

import Header from "~/components/common/Header";
import ChildProfile from "~/components/MyPage/ChildProfile";

const ChildManagement = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const childInfo = useSelector((state) => state.family.familyInfo[id]);
  const childSn = childInfo.sn;
  const accessToken = useSelector((state) => state.user.accessToken);
  const formData = useSelector((state) => state.management.formData);

  useEffect(() => {
    const fetchChildManagement = async () => {
      try {
        const data = await fetchChildManagementInfo(childSn, accessToken);
        dispatch(
          setFormData({
            baseRate: data.baseRate,
            investLimit: data.investLimit,
            loanLimit: data.loanLimit,
          })
        );
      } catch (error) {
        console.error("Failed to fetch child management info:", error);
      }
    };

    fetchChildManagement();
  }, [childSn, accessToken, dispatch]);

  const handleLeftClick = () => {
    navigate("/mypage");
  };

  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSaveClick = async () => {
    try {
      const newData = {
        childSn: childSn,
        baseRate: formData.baseRate,
        investLimit: formData.investLimit,
        loanLimit: formData.loanLimit,
      };
      await updateChildManagementInfo(accessToken, newData);
      setIsEditing(false);
      alert("정보가 업데이트 되었습니다.");
    } catch (error) {
      console.error("Failed to update child management info:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteChild(childSn, accessToken);
      dispatch(removeChildFromFamily(id));
      alert("아이가 삭제에 성공했습니다.");
    } catch (error) {
      console.error("아이 삭제 실패", error);
      alert("아이 삭제에 실패했습니다.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "baseRate") {
      if (!/^\d*\.?\d*$/.test(value)) {
        return;
      }
    } else {
      if (!/^\d*$/.test(value)) {
        return;
      }
    }

    dispatch(
      setFormData({
        ...formData,
        [name]: value,
      })
    );
  };

  return (
    <S.Container>
      <Header onLeftClick={handleLeftClick} title={"아이 관리"} right={""} />

      <S.StepWrapper>
        {childInfo ? <ChildProfile childInfo={childInfo} /> : <LoadingPlaceholder>Loading...</LoadingPlaceholder>}
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
            {isEditing ? <DetailInput type="text" name="baseRate" value={formData.baseRate} onChange={handleInputChange} /> : <DetailValue>{formData.baseRate} %</DetailValue>}
          </DetailItem>
          <DetailItem>
            <DetailLabel>투자상한액</DetailLabel>
            {isEditing ? (
              <DetailInput type="text" name="investLimit" value={formData.investLimit} onChange={handleInputChange} />
            ) : (
              <DetailValue>{normalizeNumber(formData.investLimit)} 원</DetailValue>
            )}
          </DetailItem>
          <DetailItem>
            <DetailLabel>대출상한액</DetailLabel>
            {isEditing ? <DetailInput type="text" name="loanLimit" value={formData.loanLimit} onChange={handleInputChange} /> : <DetailValue>{normalizeNumber(formData.loanLimit)} 원</DetailValue>}
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

const LoadingPlaceholder = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    h-full
  `}
`;
