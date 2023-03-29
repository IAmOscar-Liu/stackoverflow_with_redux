import { useAppDispatch, useAppSelector } from "../redux/store";
import { TRENDING_TAGS } from "../types";
import { setCurrentTag } from "../redux/searchSlice";

function TrendingTags() {
  const dispatch = useAppDispatch();
  const currentTag = useAppSelector((state) => state.search.currentTag);

  return (
    <>
      <h2>Trending</h2>
      <div className="trending-btns">
        {TRENDING_TAGS.map((tag) => (
          <button
            key={tag}
            className={tag === currentTag ? "active" : ""}
            onClick={() => dispatch(setCurrentTag(tag))}
          >
            {tag}
          </button>
        ))}
      </div>
    </>
  );
}

export default TrendingTags;
