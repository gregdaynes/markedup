const { test } = require('tap')
const { randomUUID } = require('node:crypto')
const build = require('../index')

test('command endpoint', async (t) => {
  t.plan(5)
  t.teardown(() => app.close())

  const app = await build()

  function auth() {
    return app.jwt.sign({
      name: 'test-user'
    })
  }

  function request(body = {}) {
    return app
      .inject({
        method: 'POST',
        url: '/command',
        body,
        headers: {
          Authorization: 'Bearer ' + auth()
        }
      })
      .then((res) => ({ status: res.statusCode, ...res.json() }))
  }

  await t.test('with no request body', async (t) => {
    const results = await request()

    t.same(results.status, 400, 'status code 400')
    t.same(
      results.message,
      "body should have required property 'action'",
      'indicates missing property -- action'
    )
  })

  await t.test('with no payload property', async (t) => {
    const results = await request({ action: 'test-action' })

    t.same(results.status, 400, 'status code 400')
    t.same(
      results.message,
      "body should have required property 'payload'",
      'indicates missing property -- payload'
    )
  })

  await t.test('with no meta property', async (t) => {
    const results = await request({ action: 'test-action', payload: {} })

    t.same(results.status, 400, 'status code 400')
    t.same(
      results.message,
      "body should have required property 'meta'",
      'indicates missing property -- meta'
    )
  })

  await t.test('with no meta.id property', async (t) => {
    const results = await request({
      action: 'test-action',
      payload: {},
      meta: {}
    })

    t.same(results.status, 400, 'status code 400')
    t.same(
      results.message,
      "body.meta should have required property 'id'",
      'indicates missing property -- meta.id'
    )
  })

  await t.test('with all required request data', async (t) => {
    const results = await request({
      action: 'test-action',
      payload: {},
      meta: {
        id: randomUUID()
      }
    })

    t.same(results.status, 200, 'status code 200')
    t.same(results.message, 'hello world')
  })

  t.end()
})
