import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Thought, ThoughtMeta } from './types/thought';

const thoughtsDirectory = path.join(process.cwd(), 'content/thoughts');

export function getThoughtSlugs(): string[] {
  if (!fs.existsSync(thoughtsDirectory)) {
    return [];
  }
  return fs.readdirSync(thoughtsDirectory).filter((file) => file.endsWith('.md'));
}

export function getThoughtBySlug(slug: string): Thought | null {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(thoughtsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    content,
    meta: {
      title: data.title || '',
      slug: realSlug,
      description: data.description || '',
      published: data.published ?? false,
      createdAt: data.createdAt ? new Date(data.createdAt).toISOString() : '',
      tags: data.tags || [],
    },
  };
}

export function getAllThoughts(): Thought[] {
  const slugs = getThoughtSlugs();
  return slugs
    .map((slug) => getThoughtBySlug(slug))
    .filter((thought): thought is Thought => thought !== null)
    .sort((a, b) => (a.meta.createdAt > b.meta.createdAt ? -1 : 1));
}

export function getPublishedThoughts(): Thought[] {
  const isDev = process.env.NODE_ENV === 'development';
  return getAllThoughts().filter((thought) => isDev || thought.meta.published);
}
