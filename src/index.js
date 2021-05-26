const autoLoad = require('fastify-autoload')
const fastify = require('fastify')
const path = require('path')
const database = require('./lib/database')

module.exports = async (opts) => {
  const app = fastify(opts)

  app.addHook('onClose', async () => {
    await database.destroy()
  })

  app.register(autoLoad, {
    dir: path.join(__dirname, 'plugins'),
    ignorePattern: /.*(test|spec).js/
  })

  app.register(autoLoad, {
    dir: path.join(__dirname, 'routes'),
    ignorePattern: /.*(test|spec).js/
  })

  return app
}
