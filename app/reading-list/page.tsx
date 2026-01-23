'use client';

import { useState } from 'react';
import Image from 'next/image';
import { H1, H2, P, Muted } from '@/components/ui/typography';
import type { Book, BookStatus } from '@/lib/types/book';
import booksData from '@/data/books.json';

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="flex gap-4 py-4 border-b last:border-b-0">
      <div className="relative w-16 h-24 flex-shrink-0 overflow-hidden rounded bg-muted">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs p-1 text-center">
            No cover
          </div>
        ) : (
          <Image
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover"
            sizes="64px"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <h3 className="font-medium leading-tight">{book.title}</h3>
        <Muted className="mt-1">{book.authors.join(', ')}</Muted>
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
          <BookCard key={book.isbn} book={book} />
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
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <section className="py-12 border-b">
        <H1 className="text-4xl md:text-5xl mb-4">Reading List</H1>
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
