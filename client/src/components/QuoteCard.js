import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border-left: 10px solid #f1efe6;
  padding-left: 20px;
  margin: 0 40px 40px 40px;
`;

const BlockQuote = styled.blockquote`
  margin-bottom: ${(props) => (props.isLast ? 0 : "20px")};
`;

const Name = styled.p`
  font-weight: bold;
  margin-bottom: 12px;
`;

const Text = styled.p`
  font-size: 20px;
  font-style: italic;
  font-family: "Special Elite", cursive;
  line-height: 1.4;
  &:before,
  &:after {
    color: ##d3d3d3;
  }
  &:before {
    content: "“";
  }
  &:after {
    content: "”";
  }
`;

export const QuoteCard = ({ quoteArray }) => {
  if (!quoteArray.length) return null;

  return (
    <Wrapper>
      {quoteArray.map(({ name, text }, index) => {
        return (
          <BlockQuote key={index} isLast={index === quoteArray.length - 1}>
            <Name>{name}:</Name>
            <Text>{text}</Text>
          </BlockQuote>
        );
      })}
    </Wrapper>
  );
};
