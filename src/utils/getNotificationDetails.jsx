import allowance from "~/assets/img/Noti/allowance.svg";
import etc from "~/assets/img/Noti/etc.svg";
import invest from "~/assets/img/Noti/invest.svg";
import loan from "~/assets/img/Noti/loan.svg";
import mission from "~/assets/img/Noti/mission.svg";
export const getNotificationDetails = (functionCode) => {
  switch (functionCode) {
    case 1:
      return {
        to: null,
        type: etc,
        functionText: "회원",
        boxShadowColor: "rgba(123, 123, 123, 0.8)",
      };
    case 2:
      return {
        to: null,
        type: etc,
        functionText: "송금",
        boxShadowColor: "rgba(123, 123, 123, 0.8)",
      };
    case 3:
      return {
        to: "/allowance/irregular",
        type: allowance,
        functionText: "용돈",
        boxShadowColor: "rgba(116, 161, 94, 0.8)",
      };
    case 4:
      return {
        to: "/mission",
        type: mission,
        functionText: "미션",
        boxShadowColor: "rgba(201, 193, 0, 0.8)",
      };
    case 5:
      return {
        to: "/loan/main",
        type: loan,
        functionText: "대출",
        boxShadowColor: "rgba(250, 176, 238, 0.8)",
      };
    case 6:
      return {
        to: "/invest",
        type: invest,
        functionText: "투자",
        boxShadowColor: "rgba(255, 94, 94, 0.8)",
      };
    default:
      return {
        to: null,
        type: etc,
        functionText: "기타",
        boxShadowColor: "rgba(123, 123, 123, 0.8)",
      };
  }
};
