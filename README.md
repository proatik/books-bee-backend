# Book's Bee API Documentation

Welcome to the API documentation for Book's Bee, a platform for managing books and collections. This documentation provides details about the available endpoints and their usage.

### Get books

Endpoint: `GET /api/books`

Example Request:

```http
GET /api/books
```

```http
GET /api/books/?search=Flame&author=Emily+Brown&collection_id=2
```

### Get authors

Endpoint: `GET /api/books/authors`

Example Request:

```http
GET /api/books/authors
```

### Create a book

Endpoint: `POST /api/books`

Example Request:

```http
POST /api/books
Content-Type: application/json

{
  "name": "Whispering Shadows",
  "athor": "Michael Johnson",
  "price": "21.10",
}
```

### Update a book

Endpoint: `PATCH /api/books/:book_id`

Example Request:

```http
PATCH /api/books/3
Content-Type: application/json

{
  "name": "Whispering Shadows",
  "athor": "Michael Johnson",
  "price": "21.10",
}
```

### Delete a book

Endpoint: `DELETE /api/books/:book_id`

Example Request:

```http
DELETE /api/books/3
```

### Get collections

Endpoint: `GET /api/collections`

Example Request:

```http
GET /api/collections
```

### Get books of a collection

Endpoint: `GET /api/collections/books/:collection_id`

Example Request:

```http
GET /api/collections/books/1
```

### Create a collection

Endpoint: `POST /api/collections`

Example Request:

```http
POST /api/collections
Content-Type: application/json

{
  "name": "Fiction",
}
```

### Add a book to a collection

Endpoint: `POST /api/collections/books/add`

Example Request:

```http
POST /api/collections/books/add
Content-Type: application/json

{
  "boo_id": "5",
  "collection_id":"3":
}
```

### Remove a book from a collection

Endpoint: `DELETE /api/collections/books/remove`

Example Request:

```http
DELETE /api/collections/books/remove
Content-Type: application/json

{
  "boo_id": "5",
  "collection_id":"3":
}

```

## Environment variables

Add a `.env` file on teh root directory and add all the required environment variables.

Example Environment Variables:

```.env
PORT = 3000
HOST = localhost
USER =  root
PASSWORD = 11110000
DATABASE = task
```

## Mock Data

Here are 3 SQL queries to insert mock data into the database.

```sql
INSERT INTO books (name, author, price)
VALUES
  ('Fantastic Journey', 'John Doe', 25),
  ('Mystic Secrets', 'Jane Smith', 30),
  ('Whispering Shadows', 'Michael Johnson', 20),
  ('Eternal Flame', 'Emily Brown', 22),
  ('Silent Echo', 'Robert Davis', 28),
  ('Moonlit Dreams', 'Sophia Wilson', 18),
  ('Golden Horizon', 'William Lee', 35),
  ('Crimson Sunset', 'Olivia Martin', 27),
  ('Enchanted Garden', 'Daniel White', 32),
  ('Lost Oasis', 'Ava Anderson', 24);

```

```sql
INSERT INTO collections (name)
VALUES
  ('Fiction'),
  ('Mystery'),
  ('Knowledge'),
  ('Romance'),
  ('History');
```

```sql
INSERT INTO book_collections (book_id, collection_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 3),
  (3, 2),
  (3, 3),
  (4, 1),
  (4, 4),
  (5, 2),
  (5, 4),
  (6, 1),
  (6, 2),
  (9, 3),
  (9, 4),
  (10, 1),
  (10, 4);
```
