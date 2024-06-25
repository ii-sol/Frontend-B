import React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import FetchSSE from "../../utils/FetchSSE";

const MainLayout = () => {
  return (
    <Container>
      <FetchSSE />
      <Outlet />
    </Container>
  );
};

export default MainLayout;

const Container = styled.div`
  padding: 30px;
`;
