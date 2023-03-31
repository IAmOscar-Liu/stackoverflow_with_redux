import { useEffect } from "react";
import { useQuestionsQuery } from "../redux/questionApi";
import { addCurrentItems, increaseCurrentPage } from "../redux/searchSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import LoadingSpinner from "./LoadingSpinner";
import Question from "./Question";

function Questionlist() {
  const dispatch = useAppDispatch();
  const currentTag = useAppSelector((state) => state.search.currentTag);
  const currentPage = useAppSelector((state) => state.search.currentPage);
  const currentItems = useAppSelector((state) => state.search.currentItems);
  const { data, isLoading, isFetching, error } = useQuestionsQuery({
    tagged: currentTag,
    page: currentPage,
  });

  useEffect(() => {
    const onScroll = () => {
      console.log(
        "document.body.offsetHeight: ",
        document.body.offsetHeight,
        " window.innerHeight + window.scrollY: ",
        window.innerHeight + window.scrollY
      );

      // Here is the issue
      // "window.innerHeight + window.scrollY >= document.body.offsetHeight"
      // does work well when using browser on windows
      // but it doesn't work quite well when using browser on mac
      // An easy way to fix it is to add 50px to "window.innerHeight + window.scrollY"
      // so that it will trigger refetch when it less than 50px away from bottom

      const scrolledToBottom =
        window.innerHeight + window.scrollY + 50 >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        dispatch(increaseCurrentPage());
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [isFetching, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(addCurrentItems(data));
    }
  }, [data, dispatch]);

  let mainElement;
  if (isLoading) mainElement = <LoadingSpinner />;
  else if (error) mainElement = <div>{JSON.stringify(error)}</div>;
  else
    mainElement = (
      <>
        {currentItems.length === 0 ? (
          <LoadingSpinner />
        ) : (
          currentItems.map((item) => (
            <Question key={item.unique_question_id} item={item} />
          ))
        )}
      </>
    );

  return (
    <>
      <main className="trending-body">{mainElement}</main>
      {isFetching && currentItems.length > 0 && <LoadingSpinner />}
    </>
  );
}

export default Questionlist;
