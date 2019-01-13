const typeDefs = `

type User {
  id: ID
  username: String
  password: String
  first_name: String
  last_name: String
}

type Game {
  id: ID
  title: String
  release_date: String
  developer: String
  publisher: String
}

type Query {
  allUsers: [User]
}

type Mutation {
  createUser(username: String): User
}

`

module.exports = typeDefs