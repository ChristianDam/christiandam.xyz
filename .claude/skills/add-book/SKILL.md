---
name: add-book
description: Add books to the reading list in data/books.json. Use when the user wants to add a new book to their reading list, bookshelf, or library. Triggers on requests like "add book", "add to reading list", "add to bookshelf", or when discussing adding specific book titles.
---

# Add Book Skill

Add one or more books to the reading list stored in `data/books.json`. Supports both single books and batch additions.

## Book Schema

Each book entry requires:

```json
{
  "isbn": "9780123456789",
  "title": "Book Title",
  "authors": ["Author Name"],
  "coverUrl": "https://covers.openlibrary.org/b/isbn/9780123456789-L.jpg",
  "status": "next"
}
```

## Fields

- **isbn**: 13-digit ISBN (ISBN-13 format, no hyphens)
- **title**: Full book title
- **authors**: Array of author names
- **coverUrl**: Use Open Library format: `https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg`
- **status**: Either `"finished"` (already read) or `"next"` (to read)

## Workflow

### Single Book
1. **Get book details** from user (title, author, or ISBN)
2. **Find ISBN** if not provided - search Open Library API:
   ```
   https://openlibrary.org/search.json?q={title+author}
   ```
3. **Verify book details** with user before adding
4. **Read** current `data/books.json`
5. **Add** new book entry to the `books` array
6. **Write** updated JSON back to file

### Multiple Books
When the user provides a list of books (comma-separated, numbered list, or multiple titles):

1. **Parse the list** to identify each book title and author
2. **Search Open Library API in parallel** for all books to find ISBNs:
   ```
   https://openlibrary.org/search.json?q={title+author}&fields=isbn,title,author_name
   ```
3. **Present all found books** to the user for confirmation before adding
4. **Read** current `data/books.json` once
5. **Add all books** to the `books` array in a single edit
6. **Write** updated JSON back to file

## Adding Books

Insert new books at the end of the `books` array. Use status `"next"` unless user specifies they've already read it.

## Examples

### Single Book

User: "Add Thinking, Fast and Slow by Daniel Kahneman"

```json
{
  "isbn": "9780374533557",
  "title": "Thinking, Fast and Slow",
  "authors": ["Daniel Kahneman"],
  "coverUrl": "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg",
  "status": "next"
}
```

### Multiple Books

User: "Add these books: 1984 by Orwell, Dune by Frank Herbert, The Hobbit by Tolkien"

Search for all three in parallel, then confirm with user:

```
Found the following books:
1. "1984" by George Orwell (ISBN: 9780141036144)
2. "Dune" by Frank Herbert (ISBN: 9780441172719)
3. "The Hobbit" by J.R.R. Tolkien (ISBN: 9780547928227)

Add all 3 books to your reading list?
```

After confirmation, add all books in a single edit to `data/books.json`.
