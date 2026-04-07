export interface MultimediaImage {
  url: string;
  height: number;
  width: number;
}

export interface MultimediaObject {
  caption?: string;
  credit?: string;
  default?: MultimediaImage;
  thumbnail?: MultimediaImage;
}

export interface LegacyMultimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

export type Multimedia = MultimediaObject | LegacyMultimedia[];

export interface Article {
  headline: {
    main: string;
  };
  abstract: string;
  pub_date: string;
  section_name: string;
  web_url: string;
  multimedia?: Multimedia;
}

export interface ArticleWithMultimedia extends Article {}

export interface ApiResponse {
  response: {
    docs: Article[];
  };
}

