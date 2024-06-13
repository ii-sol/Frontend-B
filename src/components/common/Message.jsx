import React, { useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { FiXCircle } from "react-icons/fi";

const Message = ({ placeholder, maxLength, onChange, info }) => {
  console.log(info);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value);
      onChange(e.target.value);
    }
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const calculateHeight = (maxLength) => {
    const lineHeight = 40;
    const lines = Math.ceil(maxLength / 30);
    return lines * lineHeight + 40;
  };

  const height = calculateHeight(maxLength);

  return (
    <Container $height={height}>
      {info && (
        <InfoContainer>
          {Object.entries(info).map(([key, value]) => (
            <InfoRow key={key}>
              <InfoKey>{key}:</InfoKey>
              <InfoValue>{value}</InfoValue>
            </InfoRow>
          ))}
        </InfoContainer>
      )}
      <Wrapper>
        <Textarea
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          maxLength={maxLength}
          $height={height}
        />
        {inputValue.length > 0 && (
          <ClearButton onClick={handleClearInput} $textareaHeight={height - 60}>
            <FiXCircle />
          </ClearButton>
        )}
      </Wrapper>
      <CharacterCount>
        {inputValue.length}/{maxLength}
      </CharacterCount>
    </Container>
  );
};

export default Message;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #f4f9ff;
  border-radius: 15px;
  height: ${(props) => props.$height + 100}px;
`;

const InfoContainer = styled.div`
  width: 85%;
  padding-top: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 5px;
  gap: 10px;
`;

const InfoKey = styled.span`
  font-weight: bold;
  color: #333;
`;

const InfoValue = styled.span`
  color: #555;
`;

const Wrapper = styled.div`
  position: relative;
  width: 90%;
  display: flex;
  justify-content: center;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: ${(props) => props.$height - 60}px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 15px;
  border: none;
  font-size: 18px;
  resize: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 30px;
  &::placeholder {
    color: #c9c9c9;
  }
`;

const ClearButton = styled.button`
  ${tw`flex items-center justify-center w-8 h-8 text-gray-500 cursor-pointer outline-none`}
  position: absolute;
  right: 0px;
  top: 3px;
  background: none;
  border: none;
`;

const CharacterCount = styled.div`
  ${tw`text-gray-500 mt-2 mb-2`}
`;
