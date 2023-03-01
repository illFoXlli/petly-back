const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
} = require("graphql");

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

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a book writter",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorsType,
            resolve: (books) => {
                return authors.find((author) => author.id === books.authorId);
            },
        },
    }),
});

const AuthorsType = new GraphQLObjectType({
    name: "Authors",
    description: "Set authors book",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return books.filter((book) => book.authorId === author.id);
            },
        },
    }),
});

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        bookIdSearch: {
            type: BookType,
            description: "A Single book",
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (parent, args) => books.find(book => book.id === args.id),
        },
        bookNameSearch: {
            type: BookType,
            description: "A Single book",
            args: {
                name: { type: GraphQLString },
            },
            resolve: (parent, args) => books.find(book => book.name === args.name),
        },
        books: {
            type: new GraphQLList(BookType),
            description: "List of All Books",
            resolve: () => books,
        },
        authors: {
            type: new GraphQLList(AuthorsType),
            description: "List of All Authors",
            resolve: () => authors,
        },
        author: {
            type: AuthorsType,
            description: "A Single Author",
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id),
        },

    }),
});

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "Add a book",
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const book = { id: books.length + 1, name: args.name, authorId: args.author }
                books.push(book)
                return book
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = schema;
