import { BookCover } from "@/components/book-cover";
import { PageHeader } from "@/components/page-header";
import { PageLayout } from "@/components/page-layout";
import { H4, Muted } from "@/components/ui/typography";
import booksData from "@/data/books.json";
import type { Book, BookStatus } from "@/lib/types/book";

export const metadata = {
  title: "Reading List",
  description: "Books I am reading and have read",
};

interface BookItemProps {
  book: Book;
}

function BookItem({ book }: BookItemProps) {
  return (
    <article className="flex gap-4 py-4 ">
      <div className="relative w-16 h-24 flex-shrink-0 overflow-hidden rounded bg-muted">
        <BookCover coverUrl={book.coverUrl} title={book.title} />
      </div>
      <div className="flex flex-col justify-center min-w-0 gap-1">
        <H4>{book.title}</H4>
        <div className="flex items-center gap-2 flex-wrap">
          <Muted>{book.authors.join(", ")}</Muted>
          <Muted>·</Muted>
          <Muted className="text-muted-foreground">{book.isbn}</Muted>
          <Muted>·</Muted>
          <Muted className="capitalize">{book.status}</Muted>
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
    <section className="py-4">
      <H4>{title}</H4>
      <div>
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

  const currentlyReading = getBooksByStatus(books, "reading");
  const upNext = getBooksByStatus(books, "next");
  const finished = getBooksByStatus(books, "finished");

  return (
    <PageLayout>
      <PageHeader
        title="Reading list"
        subtitle="Books I am reading and have read."
      />

      <BookSection title="Reading" books={currentlyReading} />
      <BookSection title="Next" books={upNext} />
      <BookSection title="Finished" books={finished} />
    </PageLayout>
  );
}
