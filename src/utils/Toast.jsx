import { styled } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import allowance from "~/assets/img/Noti/allowance2.svg";
import etc from "~/assets/img/Noti/etc2.svg";
import invest from "~/assets/img/Noti/invest2.svg";
import loan from "~/assets/img/Noti/loan2.svg";
import mission from "~/assets/img/Noti/mission2.svg";
import React from "react";

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    margin: 5px;
  }
  --toastify-color-info: #cde0ff;
  .Toastify__progress-bar--info {
    background: #cde0ff;
  }
  --toastify-text-color-light: #000000;
  .Toastify__toast-body {
    padding: 10px;
  }
  .Toastify__toast-body > div:last-child {
    margin-left: 30px;
    font-size: 20px;
  }
`;

const Icon = ({ src }) => (
  <img src={src} alt="icon" style={{ width: 50, height: 50 }} />
);

const defaultToastOption = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  closeButton: true,
};

const getIcon = (option) => {
  switch (option) {
    case 1:
    case 2:
      return etc;
    case 3:
      return allowance;
    case 4:
      return mission;
    case 5:
      return loan;
    case 6:
      return invest;
    default:
      return etc;
  }
};

export const Toast = {
  info: (message, option) => {
    const icon = getIcon(option);
    toast.info(message, {
      ...defaultToastOption,
      icon: <Icon src={icon} />,
    });
  },
};
