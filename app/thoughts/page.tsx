import Link from 'next/link';
import { getPublishedThoughts } from '@/lib/thoughts';

export const metadata = {
  title: 'Thoughts',
  description: 'A collection of thoughts and ideas',
};

export default function ThoughtsPage() {
  const thoughts = getPublishedThoughts();

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-12 border-b">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Thoughts
        </h1>
        <p className="text-lg text-muted-foreground">
          A collection of thoughts and ideas.
        </p>
      </section>

      <section className="py-12">
        {thoughts.length === 0 ? (
          <p className="text-muted-foreground">No thoughts yet.</p>
        ) : (
          <div className="space-y-8">
            {thoughts.map((thought) => (
              <article key={thought.slug} className="border-b pb-8 last:border-b-0">
                <Link href={`/thoughts/${thought.slug}`} className="block group">
                  <h2 className="text-2xl font-medium group-hover:underline">
                    {thought.meta.title}
                  </h2>
                  {thought.meta.description && (
                    <p className="text-muted-foreground mt-2">
                      {thought.meta.description}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(thought.meta.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
