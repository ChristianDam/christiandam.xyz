import { H1, P } from '@/components/ui/typography';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch',
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-12 border-b">
        <H1 className="text-4xl md:text-6xl mb-4">Contact</H1>
        <P className="text-lg text-muted-foreground">
          Get in touch with me.
        </P>
      </section>
      <section className="py-12">
        <P>Contact information coming soon.</P>
      </section>
    </main>
  );
}
