import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import tw from "twin.macro";
import { MdArrowBackIos } from "react-icons/md";

const InsideLayout = ({ service }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.from) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate("/loan/main");
  };

  return (
    <div tw="flex flex-col h-screen">
      <header tw="flex justify-between items-center p-4">
        <button tw="text-2xl" onClick={handleBack}>
          <MdArrowBackIos />
        </button>
        <h1 tw="text-2xl font-bold">{service}</h1>
        <button tw="text-lg" onClick={handleCancel}>
          취소
        </button>
      </header>
      <main tw="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default InsideLayout;
