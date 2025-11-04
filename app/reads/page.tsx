import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../../components/ui/card';

type BookStatus = 'reading' | 'read';

interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  rating?: number; // out of 5
  notes?: string;
  year?: number;
}

const books: Book[] = [
  {
    id: '1',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    status: 'read',
    rating: 5,
    notes: 'Essential reading for any software developer. Full of practical advice.',
    year: 1999,
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    status: 'read',
    rating: 4,
    notes: 'Great principles for writing maintainable code.',
    year: 2008,
  },
  {
    id: '3',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    status: 'reading',
    notes: 'Deep dive into distributed systems and data architecture.',
    year: 2017,
  },
  {
    id: '4',
    title: 'The Phoenix Project',
    author: 'Gene Kim, Kevin Behr & George Spafford',
    status: 'read',
    rating: 5,
    notes: 'A novel about IT, DevOps, and helping your business win.',
    year: 2013,
  },
];

export default function ReadsPage() {
  const currentlyReading = books.filter((book) => book.status === 'reading');
  const finishedBooks = books.filter((book) => book.status === 'read');

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">My Reads</h1>
      <p className="text-lg text-muted-foreground mb-8">
        A collection of books I&apos;ve read and am currently reading.
      </p>

      {currentlyReading.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Currently Reading
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentlyReading.map((book) => (
              <Card key={book.id} className="h-full">
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>
                    {book.author}
                    {book.year && ` (${book.year})`}
                  </CardDescription>
                </CardHeader>
                {book.notes && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {book.notes}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>
      )}

      {finishedBooks.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Finished Reading
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {finishedBooks.map((book) => (
              <Card key={book.id} className="h-full">
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>
                    {book.author}
                    {book.year && ` (${book.year})`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {book.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < book.rating!
                              ? 'text-yellow-500'
                              : 'text-gray-300 dark:text-gray-600'
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                  {book.notes && (
                    <p className="text-sm text-muted-foreground">
                      {book.notes}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
