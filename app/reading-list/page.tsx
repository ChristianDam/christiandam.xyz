import React from 'react';
import BookItem from '../../components/book-item';
import type { ReadingListData, Book } from '../../lib/types/api';

async function getReadingList(): Promise<ReadingListData> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/reading-list`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch reading list');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching reading list:', error);
    return { books: [] };
  }
}

export default async function ReadingListPage(): Promise<React.ReactElement> {
  const { books } = await getReadingList();

  const readingBooks = books.filter((book: Book) => book.status === 'reading');
  const nextBooks = books.filter((book: Book) => book.status === 'next');
  const finishedBooks = books.filter((book: Book) => book.status === 'finished');

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-12 border-b">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Reading List
        </h1>
        <p className="text-lg text-muted-foreground">
          Books I&apos;m reading, planning to read, and have finished.
        </p>
      </section>

      {readingBooks.length > 0 && (
        <section className="py-12 border-b">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Currently Reading
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {readingBooks.map((book: Book) => (
              <BookItem key={book.isbn} book={book} />
            ))}
          </div>
        </section>
      )}

      {nextBooks.length > 0 && (
        <section className="py-12 border-b">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">Up Next</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nextBooks.map((book: Book) => (
              <BookItem key={book.isbn} book={book} />
            ))}
          </div>
        </section>
      )}

      {finishedBooks.length > 0 && (
        <section className="py-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">Finished</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {finishedBooks.map((book: Book) => (
              <BookItem key={book.isbn} book={book} />
            ))}
          </div>
        </section>
      )}

      {books.length === 0 && (
        <section className="py-12">
          <p className="text-lg text-muted-foreground">
            No books in the reading list yet.
          </p>
        </section>
      )}
    </main>
  );
}
