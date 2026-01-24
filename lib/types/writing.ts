export interface WritingMeta {
  title: string;
  slug: string;
  description: string;
  published: boolean;
  createdAt: string;
  tags?: string[];
}

export interface Writing {
  slug: string;
  content: string;
  meta: WritingMeta;
}
