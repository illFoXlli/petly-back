const authors = [
    { id: 1, name: "J. K. Rowling" },
    { id: 2, name: "J. F. Murkin" },
    { id: 3, name: "A. A. Mamkin" },
];

const books = [
    { id: 1, name: "Harry Potter", authorId: 1 },
    { id: 2, name: "Harry", authorId: 2 },
    { id: 3, name: "Potter", authorId: 3 },
    { id: 4, name: "Harry Potter", authorId: 1 },
    { id: 5, name: "Harry", authorId: 3 },
    { id: 6, name: "Potter", authorId: 3 },
];

module.exports = { authors, books };
