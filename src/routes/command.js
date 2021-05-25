const fastifyPlugin = require("fastify-plugin")

const {
  command: CommandSchema,
  response: ResponseSchema,
} = require("../schemas")

module.exports = fastifyPlugin(async (app) => {
  app.post("/command", {
    preValidation: [app.authenticate],
    schema: {
      body: CommandSchema,
    },
    handler(request, reply) {
      return {
        message: "hello world",
      }
    },
  })
})
