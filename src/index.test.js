const { test } = require('tap')
const build = require('./index')

test('boots the app', async (t) => {
  t.plan(1)

  t.teardown(() => app.close())
  const app = await build()

  await app.addHook('onReady', async () => {
    t.ok(true)
  })

  await app.ready()

  t.end()
})
