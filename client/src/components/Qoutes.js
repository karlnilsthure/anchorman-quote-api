import React, { useState } from "react";
import styled from "styled-components";
import { QuoteCard } from "components/QuoteCard";
import { Button } from "components/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Qoutes = () => {
  const [quoteState, setQuoteState] = useState({
    isFetching: false,
    quotes: null,
  });
  const [error, setError] = useState({ isError: false, message: "" });

  const fetchRandomQuote = async () => {
    try {
      setQuoteState({ isFetching: true });
      setError({ isError: false, message: "" });

      const response = await fetch("/api/quotes/random");
      const { quote } = await response.json();
      setQuoteState({ isFetching: false, quotes: quote });
    } catch (err) {
      setQuoteState({ isFetching: false });
      setError({
        isError: true,
        message: "By the beard of Zeus! Something went wrong, try again.",
      });
    }
  };

  const { isFetching, quotes } = quoteState;

  return (
    <Container>
      <Button onClick={fetchRandomQuote} />
      {quotes && <QuoteCard quoteArray={quotes.data} />}
      {error.isError && <p>{error.message}</p>}
      {isFetching && <p>Loading - Stay classy</p>}
    </Container>
  );
};
