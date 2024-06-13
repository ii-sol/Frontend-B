import React, { useState } from "react";
import tw from "twin.macro";
import Modal from "react-modal";

const months = [
  "01월",
  "02월",
  "03월",
  "04월",
  "05월",
  "06월",
  "07월",
  "08월",
  "09월",
  "10월",
  "11월",
  "12월",
];

const Calendar = ({ year, month, setYear, setMonth }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMonthClick = (selectedMonth) => {
    setMonth(selectedMonth);
    closeModal();
  };

  const handleYearChange = (change) => {
    setYear((prevYear) => prevYear + change);
  };

  return (
    <div tw="flex flex-col items-center p-5">
      <div tw="flex items-center mb-4 w-full max-w-lg bg-blue-100 rounded-2xl p-2">
        <button onClick={handlePrevMonth} tw="text-xl mx-2 text-right">
          {"<"}
        </button>
        <p
          tw="text-xl flex-grow text-center cursor-pointer"
          onClick={openModal}
        >
          {year}년 {months[month]}
        </p>
        <button onClick={handleNextMonth} tw="text-xl mx-2 text-left">
          {">"}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Select Month and Year"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            top: "auto",
            bottom: "0",
            left: "0",
            right: "0",
            height: "30%",
            borderRadius: "20px",
          },
        }}
      >
        <div tw="flex flex-col items-center p-4">
          <div tw="flex justify-between w-full mb-4">
            <button
              onClick={() => handleYearChange(-1)}
              tw="text-xl mx-2 text-right"
            >
              {"<"}
            </button>
            <p tw="text-xl">{year}년</p>
            <button
              onClick={() => handleYearChange(1)}
              tw="text-xl mx-2 text-left"
            >
              {">"}
            </button>
          </div>
          <div tw="grid grid-cols-4 gap-4">
            {months.map((m, i) => (
              <button
                key={i}
                onClick={() => handleMonthClick(i)}
                tw="text-lg py-2 px-4 rounded-2xl text-sm"
                css={[month === i && tw`bg-blue-200`]}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Calendar;
