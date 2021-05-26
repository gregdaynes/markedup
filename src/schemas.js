const S = require('fluent-json-schema')

exports.command = S.object()
  .prop('action', S.string())
  .required()
  .prop('payload', S.object())
  .required()
  .prop(
    'meta',
    S.object()
      .prop('id', S.string(S.FORMATS.UUID))
      .required()
      .prop('summary', S.string())
  )
  .required()

exports.response = {
  200: S.object().prop('message', S.string())
}
