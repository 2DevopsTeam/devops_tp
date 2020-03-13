'use strict'

const { test, trait } = use('Test/Suite')('Message')
const Message = use('App/Models/Message')

trait('Test/ApiClient')

test('get list of posts', async ({ client }) => {
  await Message.create({
    message: 'Blog post content'
  })

  const response = await client.get('/messages').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    message: 'Blog post content'
  }])
})