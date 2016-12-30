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

Route.get('/', 'NeptunController.main')
Route.get('/subjects', 'NeptunController.subjects').middleware('auth')
Route.post('/subjects', 'NeptunController.filterSubjects').middleware('auth')
Route.get('/subject/:id', 'NeptunController.subject').middleware('auth')
Route.get('/addsubject', 'NeptunController.addsubject').middleware('auth')
Route.post('/addsubject', 'NeptunController.createsubject').middleware('auth')
Route.get('/subject/:id/editsubject', 'NeptunController.editsubject').middleware('auth')
Route.post('/subject/:id/editsubject', 'NeptunController.modifysubject').middleware('auth')
Route.get('/subject/:id/addcourse', 'NeptunController.addcourse').middleware('auth')
Route.post('/subject/:id/addcourse', 'NeptunController.createcourse').middleware('auth')
Route.get('/subject/:id/editcourse/:cid', 'NeptunController.editcourse').middleware('auth')
Route.post('/subject/:id/editcourse/:cid', 'NeptunController.modifycourse').middleware('auth')
Route.get('/signup/:cid', 'NeptunController.signup').middleware('auth')
Route.get('/signdown/:cid', 'NeptunController.signdown').middleware('auth')
Route.get('/trade', 'NeptunController.trade').middleware('auth')
Route.post('/trade', 'NeptunController.saveTrade').middleware('auth')
Route.get('/trades', 'NeptunController.listTrades').middleware('auth')
Route.get('/deal', 'NeptunController.deal').middleware('auth')
Route.group('ajax', function () {
  Route.get('/search', 'NeptunController.ajaxSearch').middleware('auth')
  Route.post('/signup', 'NeptunController.ajaxSignup').middleware('auth')
  Route.post('/signdown', 'NeptunController.ajaxSigndown').middleware('auth')
  Route.post('/deal', 'NeptunController.ajaxDeal').middleware('auth')
 }).prefix('/ajax'); 



Route.get('/registration', 'UserController.register').middleware('auth')
Route.get('/profile/edit', 'UserController.profileEdit').middleware('auth')
Route.get('/profile/show', 'UserController.profileShow').middleware('auth')
Route.post('/profile/edit', 'UserController.saveChanges').middleware('auth')
Route.post('/registration', 'UserController.doRegister').middleware('auth')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.logout').middleware('auth')
