import { H1, P } from '@/components/ui/typography';

export const metadata = {
  title: 'Resume',
  description: 'My professional experience',
};

export default function ResumePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-12 border-b">
        <H1 className="text-4xl md:text-6xl mb-4">Resume</H1>
        <P className="text-lg text-muted-foreground">
          My professional experience and background.
        </P>
      </section>
      <section className="py-12">
        <P>Resume content coming soon.</P>
      </section>
    </main>
  );
}
