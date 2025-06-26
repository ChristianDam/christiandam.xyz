import fs from 'fs';
import path from 'path';

export interface ArticleMeta {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  published?: boolean;
}

export interface Article {
  slug: string;
  content: string;
  meta: ArticleMeta;
}

const articlesDir = path.join(process.cwd(), 'content', 'articles');

function parseFrontMatter(file: string): { meta: Partial<ArticleMeta>; content: string } {
  const match = /^---\n([\s\S]*?)\n---\n?/m.exec(file);
  const meta: Partial<ArticleMeta> = {};
  let content = file;
  if (match) {
    const lines = match[1].split(/\n/);
    for (const line of lines) {
      const [key, ...rest] = line.split(':');
      if (!key) continue;
      // assign via index to avoid strict type issues; values will be parsed later
      (meta as Record<string, unknown>)[key.trim()] = rest.join(':').trim();
    }
    content = file.slice(match[0].length);
    if (typeof meta.tags === 'string') {
      meta.tags = (meta.tags as unknown as string)
        .split(',')
        .map((t) => t.trim());
    }
    if (typeof meta.published === 'string') {
      meta.published = meta.published === 'true';
    }
  }
  return { meta, content };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function markdownToHtml(md: string): string {
  const lines = md.split(/\r?\n/);
  let html = '';
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith('```')) {
      inCode = !inCode;
      html += inCode ? '<pre><code>' : '</code></pre>';
      continue;
    }
    if (inCode) {
      html += escapeHtml(line) + '\n';
      continue;
    }
    if (/^#\s+/.test(line)) {
      html += `<h1>${line.replace(/^#\s+/, '')}</h1>`;
    } else if (/^##\s+/.test(line)) {
      html += `<h2>${line.replace(/^##\s+/, '')}</h2>`;
    } else if (/^###\s+/.test(line)) {
      html += `<h3>${line.replace(/^###\s+/, '')}</h3>`;
    } else if (line.startsWith('> ')) {
      html += `<blockquote>${line.slice(2)}</blockquote>`;
    } else if (line.trim() === '') {
      html += '';
    } else {
      let text = line;
      text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
      text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
      text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      html += `<p>${text}</p>`;
    }
  }
  return html;
}

export function getSlugs(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getArticle(slug: string): Article | null {
  const fullPath = path.join(articlesDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const file = fs.readFileSync(fullPath, 'utf8');
  const { meta, content } = parseFrontMatter(file);
  return {
    slug,
    meta: meta as ArticleMeta,
    content: markdownToHtml(content),
  };
}

export function getAllArticles(): Article[] {
  return getSlugs()
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((a) => a.meta.published !== false);
}
