export interface ThoughtMeta {
  title: string;
  slug: string;
  description: string;
  published: boolean;
  createdAt: string;
  tags?: string[];
}

export interface Thought {
  slug: string;
  content: string;
  meta: ThoughtMeta;
}
