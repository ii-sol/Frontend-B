import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

const ChatBubble = ({ text }) => {
  return (
    <Bubble>
      <Text>{text}</Text>
    </Bubble>
  );
};

export default ChatBubble;

const Bubble = styled.div`
  ${tw`relative mb-4`}
  background-color: #eaf4ff;
  padding: 20px;
  width: fit-content;
  max-width: 80%;
  height: auto;
  font-weight: 500;
  border-radius: 15px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
`;

const Text = styled.p`
  margin: 0;
  word-wrap: break-word;
`;
