module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: __dirname + '/db/.data/sqlite.db',
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
}