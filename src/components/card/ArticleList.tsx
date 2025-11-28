import React from "react";
import { Article } from "../../types/article";

interface ArticleListProps {
  articles: Article[]; // Принимаем массив статей как пропс
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <ul>
      {articles.map((article, index) => (
        <li key={index}>
          <h2>{article.headline.main}</h2>
          <p>{article.abstract}</p>
          <p>
            <strong>Дата публикации:</strong>{" "}
            {new Date(article.pub_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Раздел:</strong> {article.section_name}
          </p>
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;






