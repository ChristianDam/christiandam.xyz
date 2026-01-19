'use client';

import React from 'react';
import type { Book } from '../lib/types/api';

interface BookItemProps {
  book: Book;
}

export default function BookItem({ book }: BookItemProps) {
  const [imageError, setImageError] = React.useState(false);
  const fallbackImage = '/book-placeholder.svg';

  const statusLabels = {
    reading: 'Currently Reading',
    next: 'Up Next',
    finished: 'Finished',
  };

  return (
    <div className="flex flex-col space-y-3 p-4 border rounded-lg hover:shadow-lg transition-shadow">
      <div className="aspect-[2/3] relative bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
        <img
          src={imageError ? fallbackImage : book.coverUrl}
          alt={`Cover of ${book.title}`}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 space-y-2">
        <h3 className="font-bold text-lg overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{book.title}</h3>
        <p className="text-sm text-muted-foreground">
          {book.authors.join(', ')}
        </p>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{statusLabels[book.status]}</span>
          <span className="text-muted-foreground">ISBN: {book.isbn}</span>
        </div>
      </div>
    </div>
  );
}
