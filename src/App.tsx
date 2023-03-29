import { useEffect, useState } from "react";
import "./App.css";
import GoTopButton from "./components/GoTopButton";
import Searchbar from "./components/Searchbar";
import Questionlists from "./components/Questionlists";
import TrendingTags from "./components/TrendingTags";
import { useAppSelector } from "./redux/store";
import SearchTags from "./components/SearchTags";
import SearchQuestionlist from "./components/SearchQuestionlists";

function App() {
  const searchInput = useAppSelector((state) => state.search.searchInput);
  const [showTopButton, toggleShowTopButton] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 800 && !showTopButton) toggleShowTopButton(true);
      else if (window.scrollY <= 800 && showTopButton)
        toggleShowTopButton(false);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [showTopButton]);

  return (
    <>
      <Searchbar />
      <div className="trending">
        {searchInput ? <SearchTags /> : <TrendingTags />}
        {searchInput ? <SearchQuestionlist /> : <Questionlists />}
      </div>
      {showTopButton && <GoTopButton />}
    </>
  );
}

export default App;
