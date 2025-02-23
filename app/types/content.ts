export type Category = 'story' | 'novel' | 'poem' | 'essay' | 'article' | 'news' | 'video';

export interface Content {
  id: string;
  title: string;
  slug: string;
  category: Category;
  coverImage?: {
    url: string;
    title: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContentfulResponse {
  items: Content[];
  total: number;
  skip: number;
  limit: number;
}
