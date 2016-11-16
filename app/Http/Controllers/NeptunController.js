'use strict'

const Database = use('Database')
const Subject = use('App/Model/Subject')

class NeptunController {
    * addsubject(request, response) {
        /*if (request.currentUser.type != 'teacher') {
            response.redirect('/')
        }*/
        console.log(request.currentUser)
        yield response.sendView('addsubject')
    }

    * addcourse(request, response) {
        /*if (request.currentUser.type != 'teacher') {
            response.redirect('/')
        }*/
        const teachers = yield Database.select('full_name').from('users').where('type', 'teacher')
        yield response.sendView('addcourse', {teachers: teachers})
    }

    * subjects(request, response) {
        /*if (request.currentUser.type != 'student') {
            response.redirect('/')
        }*/

        const subjects = yield Subject.all()
        yield response.sendView('subjects', {subjects: subjects.toJSON()})
    }

    * subject(request, response) {
        yield response.sendView('subject')
    }
}

module.exports = NeptunController
