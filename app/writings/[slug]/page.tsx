import { notFound } from 'next/navigation';
import { getWritingBySlug, getWritingSlugs } from '@/lib/writings';
import { Metadata } from 'next';
import { H1, Muted } from '@/components/ui/typography';
import { MarkdownContent } from '@/components/markdown-content';

interface WritingPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getWritingSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: WritingPageProps): Promise<Metadata> {
  const writing = getWritingBySlug(params.slug);

  if (!writing) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: writing.meta.title,
    description: writing.meta.description,
  };
}

export default function WritingPage({ params }: WritingPageProps) {
  const writing = getWritingBySlug(params.slug);
  const isDev = process.env.NODE_ENV === 'development';

  if (!writing || (!isDev && !writing.meta.published)) {
    notFound();
  }

  const showDraftBadge = isDev && !writing.meta.published;

  const formattedDate = writing.meta.createdAt
    ? new Date(writing.meta.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-2xl mx-auto">
        <header className="py-12 border-b">
          {showDraftBadge && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded mb-4">
              Draft
            </span>
          )}
          <H1 className="text-4xl md:text-5xl">{writing.meta.title}</H1>
          {formattedDate && <Muted className="mt-4">{formattedDate}</Muted>}
        </header>

        <div className="py-12 max-w-none space-y-4">
          <MarkdownContent content={writing.content} />
        </div>
      </article>
    </main>
  );
}
