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
Route.get('/subjects', 'NeptunController.subjects').middleware('auth')
Route.get('/subject/:id', 'NeptunController.subject')
Route.get('/addsubject', 'NeptunController.addsubject')
Route.post('/addsubject', 'NeptunController.createsubject')
Route.get('/subject/:id/editsubject', 'NeptunController.editsubject')
Route.post('/subject/:id/editsubject', 'NeptunController.modifysubject')
Route.get('/subject/:id/addcourse', 'NeptunController.addcourse')
Route.post('/subject/:id/addcourse', 'NeptunController.createcourse')
Route.get('/subject/:id/editcourse/:cid', 'NeptunController.editcourse')
Route.post('/subject/:id/editcourse/:cid', 'NeptunController.modifycourse')
Route.get('/signup/:cid', 'NeptunController.signup')
Route.get('/signdown/:cid', 'NeptunController.signdown')



Route.get('/registration', 'UserController.register')
Route.post('/registration', 'UserController.doRegister')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.logout')
