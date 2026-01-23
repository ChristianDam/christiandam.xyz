'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { Book, BookStatus } from '@/lib/types/book';
import booksData from '@/data/books.json';

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
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group break-inside-avoid mb-4">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm p-4 text-center">
            {book.title}
          </div>
        ) : (
          <Image
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute top-2 left-2">
          <Badge variant={STATUS_VARIANTS[book.status]}>
            {STATUS_LABELS[book.status]}
          </Badge>
        </div>
      </div>
    </article>
  );
}

// Sort books: reading first, then next, then finished
function sortBooksByStatus(books: Book[]): Book[] {
  const statusOrder: Record<BookStatus, number> = {
    reading: 0,
    next: 1,
    finished: 2,
  };
  return [...books].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
}

export default function ReadingListPage() {
  const books = sortBooksByStatus(booksData.books as Book[]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
        {books.map((book) => (
          <BookItem key={book.isbn} book={book} />
        ))}
      </div>
    </main>
  );
}
