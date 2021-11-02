import { allTypes, FindResult, FindType } from "@interfaces/api";
import { Input } from "@lib/Input";
import { api } from "@services/api";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SearchContext } from "src/contexts/searchContext";
import styled from "styled-components";
import { SearchIcon } from "./styles";

const SearchContainer = styled.div<{ open: boolean }>`
  position: relative;
  .result-list {
    visibility: ${({ open }) => (open ? "visible" : "hidden")};
    display: flex;
    flex-direction: column;
    z-index: 9999;
    position: absolute;

    top: calc(100% + 30px);
    left: 0;
    right: 0;
    padding: 0.2rem;
    border-radius: 0.5em;
    box-shadow: 1px 1px 2px 3px #0004;
    background: ${props => props.theme.colors.background};

    .results-section {
      padding: 0.5em;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      h5 {
        text-transform: uppercase;
        color: var(--placeholder);
      }

      a {
        padding: 0.5rem 1rem;
        color: var(--font);
      }
    }
  }
`;
type SearchState = {
  loading: boolean;
  results: Partial<Record<FindType, FindResult[]>>;
};

async function find(val: string) {
  try {
    const { data } = await api.get(`/search?query=${val}&types=${allTypes}`);
    return data;
  } catch (e) {
    toast.error("Ocorreu um erro na pesquisa");
  }
}

const typeLabels: Record<FindType, string> = {
  artworks: "Artes",
  tags: "Tags",
  users: "Usuários",
};

export const SearchInput: React.FC = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    loading: false,
    results: {},
  });
  const [inputValue, setInputValue] = useState("");
  const open = !!inputValue;

  useEffect(() => {
    if (inputValue) {
      setSearchState({
        loading: true,
        results: {},
      });
      const timeoutId = setTimeout(() => {
        try {
          find(inputValue).then((data) =>
            setSearchState({ loading: false, results: data })
          );
        } catch {}
      }, 1500);

      return () => {
        clearTimeout(timeoutId);
          setSearchState({
            loading: false,
            results: {},
          }
        );
      };
    }
  }, [inputValue]);

  const ResultRows = Object.entries(searchState.results).map(
    ([key, values]) => {
      return (
      <div className="results-section" key={key}>
        {key.toLocaleLowerCase() === "tags" ? (
          <Link href={values[0]?.url ? values[0].url : '/'} passHref>
            <h5 onClick={() => setInputValue("")} style={{ cursor: 'pointer' }}>{typeLabels[key]} - {values.length}</h5>
          </Link>
        ) : (
          <>
            <h5>{typeLabels[key]} - {values.length}</h5>
            {values.map(({ name, url }, indx) => {
              if (name !== "") {
                return (
                  <Link href={url} passHref key={indx}>
                    <a onClick={() => setInputValue("")}>{name}</a>
                  </Link>
                )
              }
            })}
          </>
        )}
      </div>
      )}
  );
  return (
    <SearchContainer open={open} className="search-input">
      <Input
        placeholder="Pesquisar..."
        customtype="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        iconRight={<SearchIcon />}
      />
      <section className="result-list">
        {searchState.loading ? <h3>Carregando...</h3> : ResultRows}
      </section>
    </SearchContainer>
  );
};
