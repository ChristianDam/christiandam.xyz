import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Thought } from './types/thought';

const thoughtsDirectory = path.join(process.cwd(), 'content/thoughts');

function parseDate(dateValue: unknown): string {
  if (!dateValue) return '';
  const date = new Date(dateValue as string | number | Date);
  if (isNaN(date.getTime())) return '';
  return date.toISOString();
}

function getCreatedAtTime(thought: Thought): number {
  const createdAt = thought.meta.createdAt;
  if (!createdAt) return 0;
  const time = Date.parse(createdAt);
  return Number.isNaN(time) ? 0 : time;
}

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
      createdAt: parseDate(data.createdAt),
      tags: data.tags || [],
    },
  };
}

export function getAllThoughts(): Thought[] {
  const slugs = getThoughtSlugs();
  return slugs
    .map((slug) => getThoughtBySlug(slug))
    .filter((thought): thought is Thought => thought !== null)
    .sort((a, b) => getCreatedAtTime(b) - getCreatedAtTime(a));
}

export function getPublishedThoughts(): Thought[] {
  const isDev = process.env.NODE_ENV === 'development';
  return getAllThoughts().filter((thought) => isDev || thought.meta.published);
}
