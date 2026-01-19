import React from 'react';
import { getBooks } from '../../lib/books';
import BookCard from './book-card';

export default function ReadingListPage() {
  const books = getBooks();

  const readingBooks = books.filter((book) => book.status === 'reading');
  const nextBooks = books.filter((book) => book.status === 'next');
  const finishedBooks = books.filter((book) => book.status === 'finished');

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">Reading List</h1>

      {readingBooks.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">
            Currently Reading
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {readingBooks.map((book) => (
              <BookCard key={book.isbn} book={book} />
            ))}
          </div>
        </section>
      )}

      {nextBooks.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">Up Next</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nextBooks.map((book) => (
              <BookCard key={book.isbn} book={book} />
            ))}
          </div>
        </section>
      )}

      {finishedBooks.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">Finished</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {finishedBooks.map((book) => (
              <BookCard key={book.isbn} book={book} />
            ))}
          </div>
        </section>
      )}

      {books.length === 0 && (
        <p className="text-muted-foreground">No books in the reading list yet.</p>
      )}
    </main>
  );
}
