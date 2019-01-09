// PostgreSQL

const pg = require('pg')

// Create a config for pooling behavior and client options
const config = {
  host: "localhost",
  database: "gamerprofile_db",
  port: 5433,
  user: "postgres",
  password: "mario64",
  max: 10, // max 10 idle clients
  idleTimeoutMillis: 30000 // keep idle connections open for 30 seconds
}

// Initialize a connection pool
const pool = new pg.Pool(config)

// Run a query by acquiring a client from the pool, run a query on the client, then return the client to the pool
pool.connect(function(err, client, done) {
  if (err) return console.error('error fetching client from pool', err)
  
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    // call done to release client back to pool
    done()

    if (err) return console.error('error running query', err)

    console.log(result.rows[0].number) // output: 1

  })

})

// If error encountered by client while idle in pool,
// the pool will emit an error event with both the error and the client which emitted the error,
// this is rare but can happen if there is a network partition between your app and db, or the db restarts, etc
pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
})


// Express Apollo GraphQL server 

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
 
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
 
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
 
const server = new ApolloServer({ typeDefs, resolvers });
 
const app = express();
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);