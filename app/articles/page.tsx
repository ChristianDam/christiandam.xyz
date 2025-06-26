import Link from 'next/link';
import { getPublishedArticles } from '../../lib/articles';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../components/ui/card';

export default async function ArticlesIndex() {
  const articles = getPublishedArticles();
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Articles</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="block hover:opacity-80 transition-opacity"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{article.meta.title}</CardTitle>
                {article.meta.summary && (
                  <CardDescription>{article.meta.summary}</CardDescription>
                )}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
