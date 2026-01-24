import Link from 'next/link';
import { getPublishedWritings } from '@/lib/writings';
import { H2, Muted, Small } from '@/components/ui/typography';
import { PageLayout } from '@/components/page-layout';
import { PageHeader } from '@/components/page-header';

export const metadata = {
  title: 'Writings',
  description: 'A collection of writings and ideas',
};

export default function WritingsPage() {
  const writings = getPublishedWritings();

  return (
    <PageLayout>
      <PageHeader
        title="Writings"
        subtitle="A collection of writings and ideas."
      />

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
    </PageLayout>
  );
}
