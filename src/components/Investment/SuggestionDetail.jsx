import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Indicator from "./Indicator";
import Chart from "./Chart";
import * as S from "../../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import {
  postProposalYN,
  setDisplay,
  setError,
} from "../../store/reducers/Invest/suggestDetail";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { useLocation } from "react-router-dom";
import CheckDenyProposal from "../common/Alert/CheckDenyProposal";
import { fetchProposalDetail } from "../../services/invest";

//TODO: 거절 메시지 추가
//TODO: 대기면 거절 수락 상단에 버튼 추가
const SuggestionDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const display = useSelector((state) => state.suggestDetail.display);
  const [data, setData] = useState([]);
  const pathVariable = useSelector((state) => state.invest.pathVariable);
  const proposeId = useSelector((state) => state.invest.proposeId);
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
  const error = useSelector((state) => state.suggestDetail.error);
  const [alertMessage, setAlertMessage] = useState("");
  const proposeIds = location.pathname.split("/").pop();
  console.log(error);
  useEffect(() => {
    const fetchData = async (proposeIds, pathVariable, selectedChildSn) => {
      try {
        const data = await fetchProposalDetail(
          proposeIds,
          pathVariable,
          selectedChildSn
        );
        console.log(data);
        setData(data.response);
        dispatch(setDisplay(data.response.requestProposal.status === 1));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(proposeIds, pathVariable, selectedChildSn);
  }, [proposeIds, pathVariable, selectedChildSn]);

  useEffect(() => {
    dispatch(setError(null));
  }, [selectedChildSn]);

  const formatDateToKorean = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일`;
  };

  const formattedDate1 = formatDateToKorean(data.requestProposal?.createDate);
  const formattedDate2 = formatDateToKorean(data.responseProposal?.createDate);

  const [open, setOpen] = useState(false);
  const handleDismiss = () => {
    setOpen(false);
  };
  return (
    <>
      {data.length === 0 ? (
        <div
          style={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PuffLoader color="#4056c1" />
        </div>
      ) : (
        <>
          {error && <AlertDiv>{error}</AlertDiv>}
          {display ? (
            <>
              <RowDivs>
                <BuyBtn
                  $background="#76adff"
                  onClick={() => {
                    dispatch(
                      postProposalYN({
                        proposeId: proposeIds,
                        accept: true,
                        message: null,
                        csn: selectedChildSn,
                      })
                    );
                    dispatch(setDisplay(false));
                  }}
                >
                  수락
                </BuyBtn>
                <BuyBtn
                  $background="#ff8585"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  거절
                </BuyBtn>
              </RowDivs>
            </>
          ) : (
            <></>
          )}
          <Container>
            <NameDiv>{data.companyInfo.companyName}</NameDiv>
            <RowDiv>
              <DetailWrapper>
                <DetailDiv>
                  시장가 : {data.companyInfo.currentPrice * 100}원
                </DetailDiv>
                <DetailDiv>수량 : {data.requestProposal.quantity}주</DetailDiv>
              </DetailWrapper>
              <S.TradeBadge
                $width="70px"
                $back={data.requestProposal.tradingCode}
              >
                {data.requestProposal.tradingCode === 1 ? "매수" : "매도"}
              </S.TradeBadge>
            </RowDiv>
            <Div
              style={{
                fontWeight: "600",
                fontSize: "22px",
                marginBottom: "5px",
              }}
            >
              아이의 제안 메시지
            </Div>
            <Div>{data.requestProposal.message}</Div>
            <Div style={{ textAlign: "right", marginBottom: "20px" }}>
              {formattedDate1}
            </Div>
            {data.requestProposal.status === 5 ? (
              <>
                <Div
                  style={{
                    fontWeight: "600",
                    fontSize: "22px",
                    marginBottom: "5px",
                  }}
                >
                  나의 거절 메시지
                </Div>
                <Div>{data.responseProposal?.message}</Div>
                <Div style={{ textAlign: "right", marginBottom: "20px" }}>
                  {formattedDate2}
                </Div>
              </>
            ) : (
              <></>
            )}
            <Chart />
            <Indicator />
            <BottomSheet open={open} onDismiss={handleDismiss}>
              <CheckDenyProposal
                onDismiss={handleDismiss}
                proposeId={proposeId}
              />
            </BottomSheet>
          </Container>
        </>
      )}
    </>
  );
};

export default SuggestionDetail;

const AlertDiv = styled.div`
  color: red;
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px #c8ddff;
  padding: 20px;
`;

const NameDiv = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff4c4c;
  color: white;
  width: 70px;
  height: 70px;
  font-size: 25px;
  border-radius: 15px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

const DetailDiv = styled.div`
  font-size: 20px;
`;

const Div = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const RowDivs = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 20px;
  margin-bottom: 10px;
`;

const BuyBtn = styled.button`
  border-radius: 15px;
  background: ${(props) => props.$background};
  display: flex;
  width: 140px;
  height: 48px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`;
