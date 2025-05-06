import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { books, authors } from './data.js';
import { v4 as uuidv4 } from 'uuid';

const typeDefs = readFileSync('./schema.graphql', 'utf8');

const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find(b => b.id === id),
    authors: () => authors,
    author: (_, { id }) => authors.find(a => a.id === id),
  },
  Book: {
    author: (book) => authors.find(a => a.id === book.authorId)
  },
  Author: {
    books: (author) => books.filter(b => b.authorId === author.id)
  },
  Mutation: {
    createBook: (_, { authorId, title, releaseYear }) => {
      const newBook = { id: uuidv4(), title, releaseYear, authorId };
      books.push(newBook);
      return newBook;
    },
    updateBook: (_, { id, ...updates }) => {
      const book = books.find(b => b.id === id);
      if (!book) return null;
      Object.assign(book, updates);
      return book;
    },
    deleteBook: (_, { id }) => {
      const index = books.findIndex(b => b.id === id);
      if (index === -1) return { message: "Book not found" };
      books.splice(index, 1);
      return { message: "Book deleted successfully" };
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
