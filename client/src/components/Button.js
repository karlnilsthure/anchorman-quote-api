import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  margin-bottom: 40px;
  background-color: #e46f57;
  border-radius: 4px;
  border: 1px solid #ffffff;
  display: inline-block;
  cursor: pointer;
  color: #f8f8ff;
  font-size: 16px;
  font-weight: bold;
  padding: 14px 24px;
  text-decoration: none;
  text-shadow: 0px 0px 0px #b23e35;
  :active {
    position: relative;
    top: 2px;
  }
`;

export const Button = ({ onClick }) => {
  return <StyledButton onClick={onClick}>Random qoute</StyledButton>;
};
