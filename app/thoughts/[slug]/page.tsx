import { notFound } from 'next/navigation';
import { getThoughtBySlug, getThoughtSlugs } from '@/lib/thoughts';
import { Metadata } from 'next';

interface ThoughtPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getThoughtSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: ThoughtPageProps): Promise<Metadata> {
  const thought = getThoughtBySlug(params.slug);

  if (!thought) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: thought.meta.title,
    description: thought.meta.description,
  };
}

export default function ThoughtPage({ params }: ThoughtPageProps) {
  const thought = getThoughtBySlug(params.slug);

  if (!thought) {
    notFound();
  }

  const isDev = process.env.NODE_ENV === 'development';
  const showDraftBadge = isDev && !thought.meta.published;

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-2xl mx-auto">
        <header className="py-12 border-b">
          {showDraftBadge && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded mb-4">
              Draft
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {thought.meta.title}
          </h1>
          <p className="text-muted-foreground mt-4">
            {new Date(thought.meta.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>

        <div className="py-12 prose prose-neutral dark:prose-invert max-w-none">
          {thought.content.split('\n').map((paragraph, index) => {
            if (!paragraph.trim()) return null;
            if (paragraph.startsWith('# ')) {
              return <h1 key={index}>{paragraph.slice(2)}</h1>;
            }
            if (paragraph.startsWith('## ')) {
              return <h2 key={index}>{paragraph.slice(3)}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={index}>{paragraph.slice(4)}</h3>;
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </article>
    </main>
  );
}
