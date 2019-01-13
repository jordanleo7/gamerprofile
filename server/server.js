const express = require('express');
const PORT = process.env.PORT || 4000
const app = express();

// PostgreSQL
const pool = require('./dbpool')

// GraphQL
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { ApolloServer, gql } = require('apollo-server-express');
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// Server listen
app.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);