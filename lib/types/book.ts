export type BookStatus = "next" | "reading" | "finished";

export interface Book {
  isbn: string;
  title: string;
  authors: string[];
  coverUrl: string;
  status: BookStatus;
}

export interface ReadingListData {
  books: Book[];
}
