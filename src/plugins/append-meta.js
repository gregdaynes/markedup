const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin((app, opts, done) => {
  app.decorate('appendMeta', (request, reply, next) => {
    try {
      request.body.meta.timestamp = app.requestContext.get('timestamp')
      request.body.meta.author = app.requestContext.get('author')
    } catch (err) {
      reply.send(err)
    }

    next()
  })

  done()
})
