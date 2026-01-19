# Reading List Data - How to Update

This file contains instructions for updating the reading list with your actual books from Notion.

## Current Data
The `data/books.json` file currently contains **sample data** with 6 popular books. You should replace this with your actual reading list from Notion.

## How to Update with Your Notion Data

### Option 1: Manual Update
1. Visit your Notion reading list: https://chdam.notion.site/Reading-List-0dd20717c9e548718e32ec51195a6dd4
2. For each book, gather the following information:
   - Book title
   - Author(s)
   - Reading status (Next, Reading, or Finished)
3. For each book, search the Open Library API to get:
   - ISBN (prefer ISBN-13, fall back to ISBN-10)
   - Example search: https://openlibrary.org/search.json?title=BOOK_TITLE&author=AUTHOR_NAME
4. Construct the cover URL: `https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg`
5. Update `data/books.json` following the schema below

### Option 2: Export from Notion
1. Export your Notion reading list as CSV
2. For each row, look up the ISBN and construct the data object
3. Update `data/books.json` with the complete list

## Data Schema

```json
{
  "books": [
    {
      "isbn": "9780141036144",
      "title": "1984",
      "authors": ["George Orwell"],
      "coverUrl": "https://covers.openlibrary.org/b/isbn/9780141036144-L.jpg",
      "status": "finished"
    }
  ]
}
```

### Field Descriptions
- **isbn**: ISBN-10 or ISBN-13 (string, required)
- **title**: Book title (string, required)
- **authors**: Array of author names (string[], required)
- **coverUrl**: URL to book cover from Open Library (string, required)
- **status**: Reading status - must be one of: "next", "reading", or "finished" (lowercase, required)

## Open Library API Reference

### Search for a Book
```
https://openlibrary.org/search.json?title={TITLE}&author={AUTHOR}
```

### Get Book Details by ISBN
```
https://openlibrary.org/api/books?bibkeys=ISBN:{ISBN}&format=json&jscmd=data
```

### Cover Image URLs
```
https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg
```
Size options: S (small), M (medium), L (large)

## Example Book Entry

If you have a book "Atomic Habits" by James Clear:

1. Search: https://openlibrary.org/search.json?title=Atomic%20Habits&author=James%20Clear
2. Find ISBN: `9780735211292`
3. Verify cover: https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg
4. Add to `data/books.json`:

```json
{
  "isbn": "9780735211292",
  "title": "Atomic Habits",
  "authors": ["James Clear"],
  "coverUrl": "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  "status": "reading"
}
```

## After Updating

Once you've updated `data/books.json`:
1. The changes will be reflected immediately on the `/reading-list` page
2. The API endpoint at `/api/reading-list` will return the updated data
3. No code changes or build steps are required
