const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
} = require("graphql");
const { authors, books } = require("../db_test/dt_test")



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
        book: {
            type: BookType,
            description: "A Single book",
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (parent, args) => books.find(book => book.id === args.id),
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
