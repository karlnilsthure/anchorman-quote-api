import React from "react";
import styled from "styled-components";

import { Header } from "components/Header";
import { Qoutes } from "components/Qoutes";

const Layout = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

function App() {
  return (
    <Layout>
      <Header />
      <Qoutes />
    </Layout>
  );
}

export default App;
