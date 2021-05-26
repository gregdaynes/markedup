const tableName = 'event_entries'

exports.up = async function (knex) {
  if (await knex.schema.hasTable(tableName)) return

  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary().index()
    table.string('aggregate_id', 36).notNullable().index()
    table.string('aggregate_type').notNullable()
    table.integer('sequence_number').notNullable()
    table.string('event').notNullable()
    table.jsonb('payload').notNullable()
    table.string('payload_type').notNullable()
    table.integer('payload_revision').notNullable()
    table.jsonb('metadata').default('{}')
    table.timestamp('created_at').defaultTo(knex.fn.now())

    table.index(['aggregate_id', 'sequence_number', 'event'])
  })
}

exports.down = function (knex) {}
