import styled from "styled-components";

import PrimaryButton from "../atoms/button/PrimaryButton";
import Input from "../atoms/input/Input";

const SearchInput = () => {
  // [ return component ]
  return (
    <>
      <SContainer>
        <Input placeholder="検索条件を入力" />
        <SButtonWrapper>
          <PrimaryButton>検索</PrimaryButton>
        </SButtonWrapper>
      </SContainer>
    </>
  );
};

// [ style ]
const SContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SButtonWrapper = styled.div`
  padding-left: 8px;
`;

export default SearchInput;