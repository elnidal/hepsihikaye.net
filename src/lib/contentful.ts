import { createClient } from 'contentful';

export const client = createClient({
  space: 'uht1e3ba21ir',
  accessToken: 'icJW5fz6x8wmEEQ2ORr8BWYjfLgD9hXzUnLy34A-3W8',
});

export const CATEGORIES = [
  'Öykü',
  'Roman',
  'Şiir',
  'Deneme',
  'Makale',
  'Haber',
  'Video',
] as const;

export type Category = typeof CATEGORIES[number];

export interface BlogPost {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    category: Category;
    content: any;
    images?: {
      fields: {
        file: {
          url: string;
        };
      };
    }[];
    video?: {
      fields: {
        file: {
          url: string;
        };
      };
    }[];
  };
}
