import Application from '@ioc:Adonis/Core/Application'
/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */
import { resolve } from 'path'
import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
import { loadDirectories } from 'app/infra/utils'

const migrations = loadDirectories(resolve(__dirname, '../app/modules'))
  .filter((path) => path.includes('db/migrations'))

const seeders = loadDirectories(resolve(__dirname, '../app/modules'))
  .filter((path) => path.includes('db/seeders'))
  .map((k) => {
    return `./app${k.split('app')[1]}`
  })

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | MySQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for MySQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mysql2
    |
    */
    mysql: {
      client: 'mysql2',
      connection: {
        charset: 'utf8',
        host: Env.get('MYSQL_HOST'),
        port: Env.get('MYSQL_PORT'),
        user: Env.get('MYSQL_USER'),
        password: Env.get('MYSQL_PASSWORD', ''),
        database: Env.get('MYSQL_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
        paths: [
          './database/migrations',
          ...migrations,
        ],
        disableRollbacksInProduction: true,
      },
      seeders: {
        paths: [
          './database/seeders',
          ...seeders,
        ],
      },
      healthCheck: true,
      debug: Application.inDev,
    },

    sqlite: {
      client: 'sqlite',
      connection: {
        filename: Application.tmpPath('db.sqlite3'),
      },
      pool: {
        afterCreate: (conn, cb) => {
          conn.run('PRAGMA foreign_keys=true', cb)
        },
      },
      migrations: {
        naturalSort: true,
        paths: [
          './database/migrations',
          ...migrations,
        ],
      },
      seeders: {
        paths: [
          './database/seeders',
          ...seeders,
        ],
      },
      useNullAsDefault: true,
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
