import Link from 'next/link';
import { getPublishedArticles } from '../../lib/articles';

export default async function ArticlesIndex() {
  const articles = getPublishedArticles();
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Articles</h1>
      <ul className="space-y-6">
        {articles.map((article) => (
          <li key={article.slug}>
            <h2 className="text-xl font-semibold">
              <Link
                href={`/articles/${article.slug}`}
                className="text-primary hover:underline"
              >
                {article.meta.title}
              </Link>
            </h2>
            {article.meta.summary && (
              <p className="text-muted-foreground">{article.meta.summary}</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
