const { randomUUID } = require('node:crypto')
const { Factory } = require('rosie')
const { test } = require('tap')
const Event = require('./Event')
const database = require('../database')

const EventFactory = Factory.define('event')
  .sequence('id')
  .sequence('sequenceNumber')
  .attr('aggregateId', () => randomUUID())
  .attr('aggregateType', 'test-aggregate')
  .attr('event', 'test-event')
  .attr('payload', {})
  .attr('payloadType', 'test-event')
  .attr('payloadRevision', 1)
  .attr('metadata', {})
  .attr('createdAt', () => new Date())

module.exports.eventFactory = EventFactory

test('stuff', async (t) => {
  t.plan(1)

  t.before(async (t) => {
    return database.test.setup()
  })

  t.teardown(async (t) => {
    return database.test.teardown()
  })

  await t.test('xxx', async (t) => {
    try {
      await Event.query().insert({})
    } catch (err) {
      console.error(err)
    }
  })

  t.end()
})
