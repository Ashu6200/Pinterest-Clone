import React from "react";
import styled from "styled-components";
import Masnory from "./Masnory";

const Wrapper = styled.div`
  width: 100%;
`;
const Feed = () => {
  return (
    <>
      <Wrapper>
        <Masnory />
      </Wrapper>
    </>
  );
};

export default Feed;
