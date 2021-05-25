const S = require("fluent-json-schema")
const fastifyPlugin = require("fastify-plugin")

module.exports = fastifyPlugin(async (app) => {
  app.post("/session", {
    schema: {
      body: S.object().prop("name", S.string().required()),
      response: {
        200: S.object()
          .prop("message", S.string())
          .prop("token", S.string(S.FORMATS.jwt)),
      },
    },
    async handler(request, reply) {
      const token = app.jwt.sign({
        name: request.body.name,
      })

      return {
        message: "Authorization success.",
        token,
      }
    },
  })
})
