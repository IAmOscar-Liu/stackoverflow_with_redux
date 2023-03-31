import { useEffect } from "react";
import { useQuestionsQuery } from "../redux/questionApi";
import {
  addSearchCurrentItems,
  increaseSearchCurrentPage,
} from "../redux/searchSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import LoadingSpinner from "./LoadingSpinner";
import Question from "./Question";

function SearchQuestionlist() {
  const dispatch = useAppDispatch();
  const searchSelectedTag = useAppSelector(
    (state) => state.search.searchSelectedTag
  );
  const searchCurrentItems = useAppSelector(
    (state) => state.search.searchCurrentItems
  );
  const searchCurrentPage = useAppSelector(
    (state) => state.search.searchCurrentPage
  );
  const { data, isLoading, isFetching, error } = useQuestionsQuery(
    {
      tagged: searchSelectedTag,
      page: searchCurrentPage,
    },
    { skip: !searchSelectedTag }
  );

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY + 50 >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        dispatch(increaseSearchCurrentPage());
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [isFetching, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(addSearchCurrentItems(data));
    }
  }, [data, dispatch]);

  let mainElement;
  if (!searchSelectedTag) mainElement = null;
  else if (isLoading) mainElement = <LoadingSpinner />;
  else if (error) mainElement = <div>{JSON.stringify(error)}</div>;
  else
    mainElement = (
      <>
        {searchCurrentItems.length === 0 ? (
          <LoadingSpinner />
        ) : (
          searchCurrentItems.map((item) => (
            <Question key={item.unique_question_id} item={item} />
          ))
        )}
      </>
    );

  return (
    <>
      <main className="trending-body">{mainElement}</main>
      {isFetching && searchCurrentItems.length > 0 && <LoadingSpinner />}
    </>
  );
}

export default SearchQuestionlist;
