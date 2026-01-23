import Image from 'next/image';
import { H1, H2, P, Muted, Small } from '@/components/ui/typography';
import type { Book, BookStatus } from '@/lib/types/book';
import booksData from '@/data/books.json';

export const metadata = {
  title: 'Reading List',
  description: 'Books I am reading and have read',
};

interface BookItemProps {
  book: Book;
}

function BookItem({ book }: BookItemProps) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-muted">
        <Image
          src={book.coverUrl}
          alt={`Cover of ${book.title}`}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          unoptimized
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-medium leading-tight line-clamp-2">{book.title}</h3>
        <Muted className="line-clamp-1">{book.authors.join(', ')}</Muted>
        <Small className="text-muted-foreground">{book.isbn}</Small>
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
      <H2 className="text-2xl mb-6">{title}</H2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
    <main className="container mx-auto px-4 py-8">
      <section className="py-12 border-b">
        <H1 className="text-4xl md:text-6xl mb-4">Reading List</H1>
        <P className="text-lg text-muted-foreground">
          Books I am reading and have read.
        </P>
      </section>

      <BookSection title="Currently Reading" books={currentlyReading} />
      <BookSection title="Up Next" books={upNext} />
      <BookSection title="Finished" books={finished} />
    </main>
  );
}
