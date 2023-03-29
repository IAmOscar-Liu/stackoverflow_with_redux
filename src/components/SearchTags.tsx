import { setSearchSelectedTag } from "../redux/searchSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

function SearchTags() {
  const dispatch = useAppDispatch();
  const searchInput = useAppSelector((state) => state.search.searchInput);
  const searchIsLoading = useAppSelector(
    (state) => state.search.searchIsLoading
  );
  const searchTags = useAppSelector((state) => state.search.searchTags);
  const searchSelectedTag = useAppSelector(
    (state) => state.search.searchSelectedTag
  );

  return (
    <>
      <h2>Trending tags for "{searchInput}"</h2>
      {searchIsLoading ? (
        <div>Searching...</div>
      ) : (
        <div className="trending-btns">
          {searchTags.length === 0 && <div>No results...</div>}
          {searchTags.length > 0 &&
            searchTags.map(({ name }) => (
              <button
                key={name}
                className={name === searchSelectedTag ? "active" : ""}
                onClick={() => dispatch(setSearchSelectedTag(name))}
              >
                {name}
              </button>
            ))}
        </div>
      )}
    </>
  );
}

export default SearchTags;
