const resolvers = {
  Query: {
    allUsers() {
      pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) { throw error }
        response.status(200).json(results.rows)
      })
    }
  },
  Mutation: {
    createUser: (obj, args, context) => {
      pool.query('INSERT INTO users (username) VALUES ($1)', [args.username], (error, results) => {
        if (error) { throw error }
        response.status(200).send(`User created with ID: ${results.insertId}`)
      })
    }
  }
}

module.exports = resolvers