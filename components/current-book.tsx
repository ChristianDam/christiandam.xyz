import { BookCover } from "@/components/book-cover";
import { Card, CardContent } from "@/components/ui/card";
import { Large, Muted, Small } from "@/components/ui/typography";
import booksData from "@/data/books.json";
import { ArrowUpRight } from "iconoir-react";
import Link from "next/link";

export default function CurrentBook() {
  const currentBook = booksData.books.find((book) => book.status === "reading");

  if (!currentBook) return null;

  return (
    <Link href="/reading-list" className="group">
      <Card className="relative h-full w-full hover:bg-secondary transition-colors">
        <ArrowUpRight
          strokeWidth={1.5}
          className="absolute top-4 right-4 w-5 h-5 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200"
        />
        <CardContent className="flex flex-col h-full items-center justify-center p-4">
          <Small className="mb-4 text-xs uppercase text-muted-foreground">
            Currently reading
          </Small>
          <div className="relative w-16 h-24 flex-shrink-0 rounded overflow-hidden">
            <BookCover
              coverUrl={currentBook.coverUrl}
              title={currentBook.title}
            />
          </div>
          <Large className="mt-2 line-clamp-2">{currentBook.title}</Large>
          <Muted>{currentBook.authors.join(", ")}</Muted>
        </CardContent>
      </Card>
    </Link>
  );
}
