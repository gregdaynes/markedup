const { Model } = require('../database')

module.exports = class Event extends Model {
  static get tableName() {
    return 'event_entries'
  }

  static get idColumn() {
    return 'id'
  }

  /*
  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'aggregateId',
        'aggregateType',
        'sequenceNumber',
        'event',
        'payload',
        'payloadType',
        'payloadRevision'
      ],
      properties: {
        aggregateId: {
          type: 'string',
          format: 'uuid'
        },
        aggregateType: {
          type: 'string'
        },
        sequenceNumber: {
          type: 'number'
        },
        payload: {
          type: 'object'
        },
        payloadType: {
          type: 'string'
        },
        payloadRevision: {
          type: 'integer'
        },
        metadata: {
          type: 'object',
          default: '{}'
        }
      }
    }
  }
  */
}
