import { getArticle, getPublishedArticles } from '../../../lib/articles';
import { notFound } from 'next/navigation';

interface Params { slug: string; }

export async function generateStaticParams() {
  const articles = getPublishedArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Params }) {
  const article = getArticle(params.slug);
  if (!article || article.meta.published === false) {
    notFound();
  }
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-2">
        {article.meta.title}
      </h1>
      {article.meta.date && (
        <p className="text-muted-foreground mb-6">
          {new Date(article.meta.date).toLocaleDateString()}
        </p>
      )}
      <article className="markdown" dangerouslySetInnerHTML={{ __html: article.content }} />
    </main>
  );
}
