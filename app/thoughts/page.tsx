import Link from 'next/link';
import { getPublishedThoughts } from '@/lib/thoughts';
import { H1, H2, P, Muted, Small } from '@/components/ui/typography';

export const metadata = {
  title: 'Thoughts',
  description: 'A collection of thoughts and ideas',
};

export default function ThoughtsPage() {
  const thoughts = getPublishedThoughts();

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-12 border-b">
        <H1 className="text-4xl md:text-6xl mb-4">Thoughts</H1>
        <P className="text-lg text-muted-foreground">
          A collection of thoughts and ideas.
        </P>
      </section>

      <section className="py-12">
        {thoughts.length === 0 ? (
          <Muted>No thoughts yet.</Muted>
        ) : (
          <div className="space-y-8">
            {thoughts.map((thought) => (
              <article key={thought.slug} className="border-b pb-8 last:border-b-0">
                <Link href={`/thoughts/${thought.slug}`} className="block group">
                  <H2 className="text-2xl font-medium group-hover:underline">
                    {thought.meta.title}
                  </H2>
                  {thought.meta.description && (
                    <Muted className="mt-2">{thought.meta.description}</Muted>
                  )}
                  <Small className="text-muted-foreground mt-2 block">
                    {new Date(thought.meta.createdAt).toLocaleDateString('en-US', {
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
