import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Writing } from './types/writing';

const writingsDirectory = path.join(process.cwd(), 'content/writings');

function parseDate(dateValue: unknown): string {
  if (!dateValue) return '';
  const date = new Date(dateValue as string | number | Date);
  if (isNaN(date.getTime())) return '';
  return date.toISOString();
}

function getCreatedAtTime(writing: Writing): number {
  const createdAt = writing.meta.createdAt;
  if (!createdAt) return 0;
  const time = Date.parse(createdAt);
  return Number.isNaN(time) ? 0 : time;
}

export function getWritingSlugs(): string[] {
  if (!fs.existsSync(writingsDirectory)) {
    return [];
  }
  return fs.readdirSync(writingsDirectory).filter((file) => file.endsWith('.md'));
}

export function getWritingBySlug(slug: string): Writing | null {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(writingsDirectory, `${realSlug}.md`);

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

export function getAllWritings(): Writing[] {
  const slugs = getWritingSlugs();
  return slugs
    .map((slug) => getWritingBySlug(slug))
    .filter((writing): writing is Writing => writing !== null)
    .sort((a, b) => getCreatedAtTime(b) - getCreatedAtTime(a));
}

export function getPublishedWritings(): Writing[] {
  const isDev = process.env.NODE_ENV === 'development';
  return getAllWritings().filter((writing) => isDev || writing.meta.published);
}
