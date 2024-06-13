import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Nav/Navbar";
import { styled } from "styled-components";

const NavLayout = () => {
  return (
    <Container>
      <Outlet />
      <Navbar />
    </Container>
  );
};

export default NavLayout;

const Container = styled.div`
  height: 100vh;
`;
