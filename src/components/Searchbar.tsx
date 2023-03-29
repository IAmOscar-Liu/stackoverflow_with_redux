import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import {
  setSearchInput,
  setSearchIsLoading,
  setSearchSelectedTag,
  setSearchTags,
} from "../redux/searchSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useTagsQuery } from "../redux/tagApi";

const DEBOUNCE_DELAY = 1000;

function Searchbar() {
  const dispatch = useAppDispatch();
  const searchInput = useAppSelector((state) => state.search.searchInput);
  const { data, isLoading, isFetching } = useTagsQuery(
    { inname: searchInput },
    { skip: !searchInput }
  );
  const [instantInputValue, setInstantInputValue] = useState(searchInput);

  const handleChangeText = useDebounce(
    (text: string) => {
      // console.log(text);
      dispatch(setSearchInput(text));
      dispatch(setSearchSelectedTag(""));
    },
    DEBOUNCE_DELAY,
    []
  );

  const canSubmit =
    !!searchInput &&
    searchInput === instantInputValue &&
    !isFetching &&
    (data ?? []).length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      dispatch(setSearchSelectedTag(data![0].name));
    }
  };

  useEffect(() => {
    if (data) dispatch(setSearchTags(data));
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setSearchIsLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tag"
          value={instantInputValue}
          required
          onChange={(e) => {
            setInstantInputValue(e.target.value);
            handleChangeText(e.target.value);
          }}
        />
        <button type="submit" disabled={!canSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
