import pg from 'pg'
import 'pg-query-stream'
import knex, { Knex } from 'knex'

const dotenv = require('dotenv')

dotenv.config()

if (process.env.DB_SSL !== 'false') {
  pg.defaults.ssl = true
}

const createDbConfig = (): Knex.Config => ({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.DB_SSL_CERT,
    },
  },
  pool: {
    min: 2,
    max: 3,
    idleTimeoutMillis: 10000,
  },
  acquireConnectionTimeout: 2000,
})

let client: Knex

export const getDbClient = () => {
  if (!client) {
    client = knex(createDbConfig())
  }

  return client
}
