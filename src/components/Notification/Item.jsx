import React, { useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { styled } from "styled-components";
import { onTouchStart, onTouchEnd } from "../../utils/touchDeleteHandler.jsx";
import { useDispatch } from "react-redux";
import { deleteNoti } from "../../store/reducers/Noti/notification.jsx";
import { useNavigate } from "react-router-dom";
import { getNotificationDetails } from "../../utils/getNotificationDetails.jsx";

const Item = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();
  const [startX, setStartX] = useState(0);

  const { to, type, functionText, boxShadowColor } = getNotificationDetails(
    data.functionCode
  );

  const onDelete = (nsn) => {
    if (ref.current) {
      ref.current.style.transform = "translateX(0px)";
      ref.current.style.transition = "none";
    }

    dispatch(deleteNoti(nsn)).then(() => {
      if (ref.current) {
        setTimeout(() => {
          ref.current.style.transition = "transform 1000ms";
        }, 0);
      }
    });
  };

  const hour = String(data.createDate[3]).padStart(2, "0");
  const minute = String(data.createDate[4]).padStart(2, "0");

  return (
    <RowDivs>
      <DeleteDiv onClick={() => onDelete(data.notificationSerialNumber)}>
        <FaRegTrashAlt size="30" />
      </DeleteDiv>
      <Container
        ref={ref}
        onTouchStart={(e) => onTouchStart(e, ref, setStartX)}
        onTouchEnd={() => onTouchEnd(ref)}
        $boxShadowColor={boxShadowColor}
        onClick={() => navigate(to)}
      >
        <ImgWrapper>
          <Img src={type} alt="function icon" />
        </ImgWrapper>
        <ColumnDiv>
          <RowDiv>
            <Div>{functionText}</Div>
            <Div>
              {hour}:{minute}
            </Div>
          </RowDiv>
          <Content>{data.messageCode}</Content>
        </ColumnDiv>
      </Container>
    </RowDivs>
  );
};

export default Item;

const RowDivs = styled.div`
  position: relative;
  display: flex;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  background-color: #fcfdff;
  padding: 20px;
  box-shadow: 0px 0px 6px 0px ${(props) => props.$boxShadowColor};
  border-radius: 20px;
  height: 110px;
  margin: 10px 5px;
  transition: transform 800ms;
  transform: translateX(0px);
`;

const ImgWrapper = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  max-width: 100%;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: 15px;
  gap: 5px;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Div = styled.div`
  color: #154b9b;
  font-weight: 700;
`;

const Content = styled.div`
  font-weight: 500;
`;

const DeleteDiv = styled.div`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  min-width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
