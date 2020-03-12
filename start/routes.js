'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/messages', "MessageController.all")
Route.post('/messages', "MessageController.save")
Route.post('/kabaApi', "MessageController.kabaApi")
Route.get('/', ({ view }) => {
    return view.render('hello-world', {content_sended: ""})
  }).as('hello')
  