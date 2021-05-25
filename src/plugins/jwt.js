const fastifyPlugin = require("fastify-plugin")
const fastifyJwt = require("fastify-jwt")

let { JWT_SECRET } = process.env

module.exports = fastifyPlugin(async (app) => {
  if (!JWT_SECRET) {
    JWT_SECRET = "change-me"
    app.log.warn(
      "Using default value environment variable JWT_SECRET - set in .env"
    )
  }

  app.register(fastifyJwt, {
    secret: JWT_SECRET,
  })

  // expose preValidation step authenticate for routes
  app.decorate("authenticate", async (request, reply) => {
    try {
      let token = await request.jwtVerify()

      app.requestContext.set("author", token.name)
    } catch (err) {
      reply.send(err)
    }
  })
})
