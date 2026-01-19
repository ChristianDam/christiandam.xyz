'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
} from '../../components/ui/card';

interface Book {
  isbn: string;
  title: string;
  authors: string[];
  coverUrl: string;
  status: 'next' | 'reading' | 'finished';
}

export default function BookCard({ book }: { book: Book }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="relative w-24 h-36 bg-muted rounded overflow-hidden flex items-center justify-center">
              {!imageError ? (
                <Image
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="text-muted-foreground text-xs text-center p-2">
                  No cover available
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {book.authors.join(', ')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
