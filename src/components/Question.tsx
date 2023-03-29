import { Item } from "../types";

function Question({ item }: { item: Item }) {
  return (
    <article key={item.question_id}>
      <div className="article-body">
        <h4 className="article-body-title">
          <a href={item.link} target="_blank" rel="noreferrer">
            {item.title}
          </a>
        </h4>
        <div className="article-body-content">
          <div className="score">
            <p>Score</p>
            <span className={item.score < 0 ? "below-zero" : ""}>
              {item.score}
            </span>
          </div>
          <div className="answers">
            <p>Answers</p>
            <span
              className={
                item.answer_count > 0
                  ? item.accepted_answer_id
                    ? "border highlight"
                    : "border"
                  : ""
              }
            >
              {item.answer_count}
            </span>
          </div>
          <div className="viewed">
            <p>Viewed</p>
            <span>{item.view_count}</span>
          </div>
        </div>
      </div>
      <div className="article-owner">
        <div className="img-wrapper">
          <img
            src={item.owner.profile_image}
            alt={item.owner.profile_image}
            loading="lazy"
          />
        </div>
        <span>{item.owner.display_name}</span>
      </div>
    </article>
  );
}

export default Question;
