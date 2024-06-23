import React, { useEffect, useState } from "react";
import * as S from "../../styles/GlobalStyles";
import Header from "~/components/common/Header";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import Filter from "../../components/Notification/Filter";
import NotiList from "../../components/Notification/NotiList";
import Delete from "../../assets/img/Invest/delete.svg";
import CheckDeleteNoti from "../../components/common/Alert/CheckDeleteNoti";
import { BottomSheet } from "react-spring-bottom-sheet";

const Notification = () => {
  const navigate = useNavigate();
  const handleLeftClick = () => {
    navigate("/");
  };
  const [open, setOpen] = useState(false);

  const handleDismiss = () => {
    setOpen(false);
  };
  return (
    <S.Container>
      <Header
        left={<MdArrowBackIos />}
        onLeftClick={handleLeftClick}
        title={"알림"}
        right={<img src={Delete} alt="Delete" width={25} />}
        onRightClick={() => setOpen(true)}
      />
      <Filter />
      <NotiList />
      <BottomSheet open={open} onDismiss={handleDismiss}>
        <CheckDeleteNoti onDismiss={handleDismiss} />
      </BottomSheet>
    </S.Container>
  );
};

export default Notification;
