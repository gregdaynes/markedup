const Knex = require('knex')
const knexfile = require('../../knexfile.js')
const path = require('path')
const { Model, knexSnakeCaseMappers, AjvValidator } = require('objection')

// Setup knex with configuration from the config file
const knex = Knex({
  ...knexfile,
  ...knexSnakeCaseMappers()
})

module.exports = knex

// Objection Setup
Model.knex(knex)

// Helper functions for testing managing the database
module.exports.test = {
  async setup() {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Database test utility setup() called')
      process.exit(1)
    }
    if (!knex.client.pool || knex.client.pool.destroyed) await knex.initialize()
    return await knex.migrate.latest()
  },
  async del(table, id) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Database test utility setup() called')
      process.exit(1)
    }
    return await knex(table).where({ id }).del()
  },
  async teardown() {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Database test utility setup() called')
      process.exit(1)
    }
    return await knex.destroy()
  }
}

// Base model for objection models, this pre-sets the model path to be the models directory.
// This allows each model file to reference other models, without the need to use require, which
// prevents require loops.
module.exports.Model = class BaseModel extends Model {
  static get modelPaths() {
    // this assumes this module, and models/ are located in /lib/
    return [path.join(__dirname, 'models')]
  }

  static createValidator() {
    return new AjvValidator({
      onCreateAjv: (ajv) => {},
      options: {
        allErrors: true,
        validateSchema: true,
        ownProperties: true,
        v5: true,
        coerceTypes: true
      }
    })
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext)

    // SQLite will take a string for time (has no concept of datetime)
    // MySQL will not and requires it to be a real datetime object or a mysql ready representation
    // of it in the correct timezone. Combine this with a correct `SET time_zone = timezone` during
    // the connection pool creation, gives us proper datetime.
    this.created_at = new Date()
  }
}
