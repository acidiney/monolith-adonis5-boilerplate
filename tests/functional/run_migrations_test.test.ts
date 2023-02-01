import execa from 'execa'
import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
test.group('Run migrations test', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should run all migrations', async () => {
    await execa.node('ace', ['migration:run'])
  })

  test('should do rollback all migrations', async () => {
    await execa.node('ace', ['migration:rollback'])
  })
})
