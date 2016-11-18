'use strict'

const Database = use('Database')
const Subject = use('App/Model/Subject')
const Teacher = use('App/Model/Teacher')
const User = use('App/Model/User')
const Course = use('App/Model/Course')
const Student = use('App/Model/Student')

class NeptunController {
    * addsubject(request, response) {
        /*if (request.currentUser.type != 'teacher') {
            response.redirect('/')
        }*/

        yield response.sendView('addsubject')
    }

    * createsubject(request, response) {
        /*if (request.currentUser.type != 'teacher') {
            response.redirect('/')
        }*/

        const data = request.except('_csrf');
        const subject = new Subject()
        subject.name = data.name
        subject.credit = data.credit
        subject.web = data.web
        subject.description = data.description
        subject.lecturer = request.currentUser.id
        yield subject.save()
        yield response.redirect('/subjects')
    }

    * editsubject(request, response) {
        const subject = yield Subject.find(request.param('id'))
        /*if (request.currentUser.type != 'teacher' && subject.toJSON().lecturer != request.currentUser.id) {
            response.redirect('/')
        }*/
        yield response.sendView('editsubject', { subject: subject.toJSON() })
    }

    * modifysubject(request, response) {
        const data = request.except('_csrf');
        const subject = yield Subject.find(request.param('id'))
        /*if (request.currentUser.type != 'teacher' && subject.toJSON().lecturer != request.currentUser.id) {
            response.redirect('/')
        }*/
        subject.name = data.name
        subject.credit = data.credit
        subject.web = data.web
        subject.description = data.description
        yield subject.save()
        yield response.redirect('/subjects')
    }

    * addcourse(request, response) {
        /*if (request.currentUser.type != 'teacher') {
            response.redirect('/')
        }*/
        const teachers = yield Teacher.with('user').fetch()
        yield response.sendView('addcourse', { teachers: teachers.toJSON() })
    }

    * editcourse(request, response) {
        const subject = yield Subject.find(request.param('id'))
        const course = yield Course.find(request.param('cid'))
        /*if (request.currentUser.type != 'teacher' && subject.toJSON().lecturer == request.currentUser.id) {
            response.redirect('/')
        }*/
        const teachers = yield Teacher.with('user').fetch()
        console.log(course.isClosed)
        yield response.sendView('editcourse', { teachers: teachers.toJSON(), course: course.toJSON() })
    }

    * modifycourse(request, response) {
        const data = request.except('_csrf');
        const subject = yield Subject.find(request.param('id'))
        const course = yield Course.find(request.param('cid'))
        /*if (request.currentUser.type != 'teacher' && subject.toJSON().lecturer == request.currentUser.id) {
            response.redirect('/')
        }*/
        course.max_headcount = data.max_headcount
        course.class_schedule = data.class_schedule
        course.room = data.room
        course.lecturer = data.teacher_id
        course.isClosed = data.isClosed == null
        yield course.save()
        yield response.redirect('/subject/' + request.param('id'))
    }

    * createcourse(request, response) {
        const data = request.except('_csrf');

        const course = new Course()

        course.headcount = 0
        course.max_headcount = data.max_headcount
        course.class_schedule = data.class_schedule
        course.room = data.room
        course.lecturer = data.teacher_id
        course.isClosed = data.isClosed == null
        course.subject_id = request.param('id')
        yield course.save()
        yield response.redirect('/subject/' + request.param('id'))
    }

    * subjects(request, response) {
        const page = Math.max(1, request.input('p'))
        const subjects = yield Database.from('v_subjects').paginate(page, 5)
        const teachers = yield Teacher.query().with('user').fetch()
        yield response.sendView('subjects', { subjects: subjects })
    }

    * subject(request, response) {
        const subject = yield Subject.find(request.param('id'))
        const student = yield Student.findBy('user_id', request.currentUser.id)
        var signedUpCourseId = 0
        if (request.currentUser.type == "student") {
            yield student.related('courses').load()
            for (var i = 0; i < student.toJSON().courses.length; i++) {
                if (student.toJSON().courses[i].subject_id == request.param('id')) {
                    signedUpCourseId = student.toJSON().courses[i].id
                }
            }
        }
        yield subject.related('courses.teacher.user', 'teacher.user').load()
        yield response.sendView('subject',
            {
                subject: subject.toJSON(),
                teacher: subject.toJSON().teacher.user,
                courses: subject.toJSON().courses,
                param_id: request.param('id'),
                signedUpCourseId: signedUpCourseId
            })
    }

    * signup(request, response) {
        const student = yield Student.findBy('user_id', request.currentUser.id)
        const cid = [request.param('cid')]
        yield student.courses().attach(cid)
        const course = yield Course.find(request.param('cid'))
        course.headcount++
        yield course.save()
        yield response.redirect('/subjects')
    }

    * signdown(request, response) {
        const student = yield Student.findBy('user_id', request.currentUser.id)
        const cid = [request.param('cid')]
        yield student.courses().detach(cid)
        const course = yield Course.find(request.param('cid'))
        course.headcount--
        yield course.save()
        yield response.redirect('/subjects')
    }

}

module.exports = NeptunController
