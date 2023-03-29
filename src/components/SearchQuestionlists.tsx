import { useEffect } from "react";
import { useQuestionsQuery } from "../redux/questionApi";
import { setSearchCurrentItems } from "../redux/searchSlice";
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
  const { data, isLoading, error } = useQuestionsQuery(
    {
      tagged: searchSelectedTag,
      page: 1,
    },
    { skip: !searchSelectedTag }
  );

  useEffect(() => {
    if (data) {
      dispatch(setSearchCurrentItems(data));
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

  return <main className="trending-body">{mainElement}</main>;
}

export default SearchQuestionlist;
