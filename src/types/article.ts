export interface Article {
  headline: {
    main: string;
  };
  abstract: string;
  pub_date: string; // Формат: "2023-01-01T00:00:00Z"
  section_name: string;
  web_url: string;
  multimedia?: Multimedia[];
}

export interface Multimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

export interface ArticleWithMultimedia extends Article {
  multimedia?: Multimedia[];
}

export interface ApiResponse {
  response: {
    docs: Article[];
  };
}

