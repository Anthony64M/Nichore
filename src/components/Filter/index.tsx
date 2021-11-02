import React from "react";

import { Container } from "./style";
import { SearchInput } from "@components/Header/SearchInput";

export const Filter: React.FC = () => {
  return (
    <Container>
      <span className="search-input">
        <SearchInput />

      </span>
    </Container>
  );
};
