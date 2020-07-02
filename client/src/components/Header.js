import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #e46f57;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-weight: bold;
  color: #f8f8ff;
  font-size: 70px;
  text-align: center;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Title>Anchorman quotes</Title>
    </StyledHeader>
  );
};
