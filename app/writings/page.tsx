import Link from 'next/link';
import { getPublishedWritings } from '@/lib/writings';
import { H1, H2, P, Muted, Small } from '@/components/ui/typography';

export const metadata = {
  title: 'Writings',
  description: 'A collection of writings and ideas',
};

export default function WritingsPage() {
  const writings = getPublishedWritings();

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-12 border-b">
        <H1 className="text-4xl md:text-6xl mb-4">Writings</H1>
        <P className="text-lg text-muted-foreground">
          A collection of writings and ideas.
        </P>
      </section>

      <section className="py-12">
        {writings.length === 0 ? (
          <Muted>No writings yet.</Muted>
        ) : (
          <div className="space-y-8">
            {writings.map((writing) => (
              <article key={writing.slug} className="border-b pb-8 last:border-b-0">
                <Link href={`/writings/${writing.slug}`} className="block group">
                  <H2 className="text-2xl font-medium group-hover:underline">
                    {writing.meta.title}
                  </H2>
                  {writing.meta.description && (
                    <Muted className="mt-2">{writing.meta.description}</Muted>
                  )}
                  <Small className="text-muted-foreground mt-2 block">
                    {new Date(writing.meta.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Small>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
