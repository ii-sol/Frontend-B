import React, { useState, useEffect, useRef } from "react";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import message from "~/assets/img/child/message.svg";
import NextButton from "../../../components/Loan/NextButton";

const Message = () => {
  const [messageText, setMessageText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [error, setError] = useState("");
  const messageRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Adjust the height of the textarea to fit the content
    if (messageRef.current) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
    }
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [messageText, titleText]);

  const handleChange = (e) => {
    if (e.target.value.length <= 50) {
      setMessageText(e.target.value);
      setError("");
    }
  };

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 10) {
      setTitleText(e.target.value);
      setError("");
    }
  };

  const handleNext = () => {
    if (messageText.length > 0 && titleText.length > 0) {
      navigate("/loan/complete");
    } else {
      setError("제목과 메세지를 1자 이상 입력해주세요.");
    }
  };

  return (
    <div tw="flex flex-col h-screen justify-between">
      <div tw="flex flex-col items-center p-5">
        <img src={message} tw="mb-4" alt="Message" />
        <div tw="w-full max-w-md">
          <div tw="bg-blue-100 p-6 rounded-2xl mb-4">
            <div tw="bg-white p-3 rounded-2xl mb-4">
              <textarea
                ref={titleRef}
                value={titleText}
                onChange={handleTitleChange}
                rows={1}
                tw="resize-none w-full outline-none border-none text-center text-lg overflow-hidden"
                placeholder="제목을 입력하세요."
              />
            </div>
            <div tw="bg-white p-3 rounded-2xl">
              <textarea
                ref={messageRef}
                value={messageText}
                onChange={handleChange}
                rows={1}
                tw="resize-none w-full outline-none border-none text-center text-lg overflow-hidden"
                placeholder="메세지를 입력하세요"
              />
            </div>
          </div>
          <p tw="text-gray-500 text-center">{messageText.length}/50</p>
          {error && <p tw="text-red-500 text-center mt-2">{error}</p>}
        </div>
      </div>
      <footer tw="p-4">
        <NextButton onClick={handleNext} />
      </footer>
    </div>
  );
};

export default Message;
