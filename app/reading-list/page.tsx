import { H2, Muted, Small } from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';
import { BookCover } from '@/components/book-cover';
import type { Book, BookStatus } from '@/lib/types/book';
import booksData from '@/data/books.json';
import { PageLayout } from '@/components/page-layout';
import { PageHeader } from '@/components/page-header';

export const metadata = {
  title: 'Reading List',
  description: 'Books I am reading and have read',
};

const STATUS_LABELS: Record<BookStatus, string> = {
  reading: 'Reading',
  next: 'Up Next',
  finished: 'Finished',
};

const STATUS_VARIANTS: Record<BookStatus, 'default' | 'secondary' | 'outline'> = {
  reading: 'default',
  next: 'secondary',
  finished: 'outline',
};

interface BookItemProps {
  book: Book;
}

function BookItem({ book }: BookItemProps) {
  return (
    <article className="flex gap-4 py-4 border-b last:border-b-0">
      <div className="relative w-16 h-24 flex-shrink-0 overflow-hidden rounded bg-muted">
        <BookCover coverUrl={book.coverUrl} title={book.title} />
      </div>
      <div className="flex flex-col justify-center min-w-0 gap-1">
        <h3 className="font-medium leading-tight">{book.title}</h3>
        <Muted>{book.authors.join(', ')}</Muted>
        <div className="flex items-center gap-2">
          <Badge variant={STATUS_VARIANTS[book.status]}>
            {STATUS_LABELS[book.status]}
          </Badge>
          <Small className="text-muted-foreground">{book.isbn}</Small>
        </div>
      </div>
    </article>
  );
}

interface BookSectionProps {
  title: string;
  books: Book[];
}

function BookSection({ title, books }: BookSectionProps) {
  if (books.length === 0) return null;

  return (
    <section className="py-8">
      <H2 className="text-2xl mb-4">{title}</H2>
      <div className="divide-y">
        {books.map((book) => (
          <BookItem key={book.isbn} book={book} />
        ))}
      </div>
    </section>
  );
}

function getBooksByStatus(books: Book[], status: BookStatus): Book[] {
  return books.filter((book) => book.status === status);
}

export default function ReadingListPage() {
  const books = booksData.books as Book[];

  const currentlyReading = getBooksByStatus(books, 'reading');
  const upNext = getBooksByStatus(books, 'next');
  const finished = getBooksByStatus(books, 'finished');

  return (
    <PageLayout>
      <PageHeader
        title="Reading List"
        subtitle="Books I am reading and have read."
      />

      <BookSection title="Currently Reading" books={currentlyReading} />
      <BookSection title="Up Next" books={upNext} />
      <BookSection title="Finished" books={finished} />
    </PageLayout>
  );
}
