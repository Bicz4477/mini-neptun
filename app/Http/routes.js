'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('main')
Route.get('/subjects', 'NeptunController.subjects')
Route.get('/subject/:id', 'NeptunController.subject')
Route.get('/addsubject', 'NeptunController.addsubject')
Route.get('/addcourse', 'NeptunController.addcourse')
Route.get('/registration', 'UserController.register')
Route.post('/registration', 'UserController.doRegister')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.logout')
