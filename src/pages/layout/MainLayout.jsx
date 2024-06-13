import React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

const MainLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default MainLayout;

const Container = styled.div`
  padding: 30px;
`;
