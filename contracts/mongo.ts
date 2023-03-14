
declare module '@ioc:App/Database/Mongodb' {
  import { MongoDb } from 'providers/MongoDbProvider/MongoDb'

  const MongodbDatabase: MongoDb

  export default MongodbDatabase
}
