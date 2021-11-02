import { useContext } from "react";
import { SearchContext } from "../contexts/searchContext";

export function useSearch() {
  const search = useContext(SearchContext);

  return search;
}
