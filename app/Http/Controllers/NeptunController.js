'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Subject = use('App/Model/Subject')
const Teacher = use('App/Model/Teacher')
const User = use('App/Model/User')
const Course = use('App/Model/Course')
const Student = use('App/Model/Student')
const Trade = use('App/Model/Trade')

class NeptunController {
    * addsubject(request, response) {
        if (request.currentUser.type != 'teacher') {
            response.redirect('/')
        }

        yield response.sendView('addsubject')
    }

    * createsubject(request, response) {
        if (request.currentUser.type != 'teacher') {
            response.redirect('/')
        }

        const data = request.except('_csrf');
        const rules = {
            name: 'required|unique:subjects',
            credit: 'required'
        };
        const validation = yield Validator.validateAll(data, rules)

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            response.redirect('back')
            return
        }
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
        if (request.currentUser.type != 'teacher' && subject.toJSON().lecturer != request.currentUser.id) {
            response.redirect('/')
        }
        yield response.sendView('editsubject', { subject: subject.toJSON() })
    }

    * modifysubject(request, response) {
        const data = request.except('_csrf');
        const subject = yield Subject.find(request.param('id'))
        if (request.currentUser.type != 'teacher' && subject.toJSON().lecturer != request.currentUser.id) {
            response.redirect('/')
        }
        subject.name = data.name
        subject.credit = data.credit
        subject.web = data.web
        subject.description = data.description
        yield subject.save()
        yield response.redirect('/subjects')
    }

    * addcourse(request, response) {
        const subject = yield Subject.find(request.param('id'))
        if (request.currentUser.type != 'teacher' && subject.toJSON().lecturer != request.currentUser.id) {
            response.redirect('/')
        }
        const teachers = yield Teacher.with('user').fetch()
        yield response.sendView('addcourse', { teachers: teachers.toJSON() })
    }

    * editcourse(request, response) {
        const subject = yield Subject.find(request.param('id'))
        const course = yield Course.find(request.param('cid'))
        if (request.currentUser.type != 'teacher' && subject.toJSON().lecturer != request.currentUser.id) {
            response.redirect('/')
        }
        const teachers = yield Teacher.with('user').fetch()
        console.log(course.isClosed)
        yield response.sendView('editcourse', { teachers: teachers.toJSON(), course: course.toJSON() })
    }

    * modifycourse(request, response) {
        const data = request.except('_csrf');
        const subject = yield Subject.find(request.param('id'))
        const course = yield Course.find(request.param('cid'))
        if (request.currentUser.type != 'teacher' && subject.toJSON().lecturer != request.currentUser.id) {
            response.redirect('/')
        }
        course.max_headcount = data.max_headcount
        course.class_schedule = data.class_schedule
        course.room = data.room
        course.lecturer = data.user_id
        course.isClosed = data.isClosed == null
        yield course.save()
        yield response.redirect('/subject/' + request.param('id'))
    }

    * createcourse(request, response) {
        const data = request.except('_csrf');
        const subject = yield Subject.find(request.param('id'))
        if (request.currentUser.type != 'teacher' && subject.toJSON().lecturer != request.currentUser.id) {
            response.redirect('/')
        }
        const course = new Course()

        course.headcount = 0
        course.max_headcount = data.max_headcount
        course.class_schedule = data.class_schedule
        course.room = data.room
        course.lecturer = data.user_id
        course.isClosed = data.isClosed == null
        course.subject_id = request.param('id')
        yield course.save()
        yield response.redirect('/subject/' + request.param('id'))
    }

    * subjects(request, response) {
        const page = Math.max(1, request.input('p'))
        const subjects = yield Database.from('v_subjects').paginate(page, 5)
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
                    break
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
        if (request.currentUser.type != "student") {
            response.redirect('/')
        }
        const student = yield Student.findBy('user_id', request.currentUser.id)
        const cid = [request.param('cid')]
        yield student.courses().attach(cid)
        const course = yield Course.find(request.param('cid'))
        course.headcount++
        yield course.save()
        yield response.redirect('/subjects')
    }

    * signdown(request, response) {
        if (request.currentUser.type != "student") {
            response.redirect('/')
        }
        const student = yield Student.findBy('user_id', request.currentUser.id)
        const cid = [request.param('cid')]
        yield student.courses().detach(cid)
        const course = yield Course.find(request.param('cid'))
        course.headcount--
        yield course.save()
        yield response.redirect('/subjects')
    }

    * trade(request, response) {
        if (request.currentUser.type != "student") {
            response.redirect('/')
        }
        const cid = request.input('id')
        const student = yield Student.findBy('user_id', request.currentUser.id)
        yield student.related('courses').load()
        var securityCheck = false;
        for (var i = 0; i < student.toJSON().courses.length; i++) {
            if (cid == student.toJSON().courses[i].id) {
                securityCheck = true;
                break
            }
        }
        if (!securityCheck) {
            yield response.redirect('/')
        }

        const subject = yield Subject.find(student.toJSON().courses[i].subject_id)
        yield subject.related('courses').load()
        console.log(subject.toJSON())
        //console.log(courses)
        yield response.sendView('trade', { give: cid, subjects: subject.toJSON() })
    }

    * saveTrade(request, response) {
        if (request.currentUser.type != "student") {
            response.redirect('/')
        }
        const cid = request.input('id')
        const data = request.except('_csrf');
        const student = yield Student.findBy('user_id', request.currentUser.id)
        const trade = new Trade()
        trade.student_id = student.id
        trade.give_course_id = cid
        trade.wanted_course_id = data.wanted
        yield trade.save()
        yield response.redirect('/')
    }

    * listTrades(request, response) {
        if (request.currentUser.type != "student") {
            response.redirect('/')
        }
        const student = yield Student.findBy('user_id', request.currentUser.id)
        const courses = yield Database.select('course_id').from('mx_course_student').where('student_id', student.toJSON().id)
        var ids = new Array(0)
        for( var i = 0; i < courses.length; i++) {
            ids.push(courses[i].course_id)
        }
        const trades = yield Database.from('trades').whereIn('wanted_course_id', ids)
        yield response.sendView('trades', {offers: trades, student: student.toJSON()})
    }

    * deal(request, response) {
        if (request.currentUser.type != "student") {
            response.redirect('/')
        }
        const id = request.input('id')
        const trade = yield Trade.find(id)
        const s1 = yield Student.findBy('user_id', request.currentUser.id)
        const s2 = yield Student.find(trade.toJSON().student_id) 
        const wanted = [trade.toJSON().wanted_course_id]
        const give = [trade.toJSON().give_course_id]
        yield s2.courses().detach(give)
        yield s1.courses().detach(wanted)
        yield s2.courses().attach(wanted)
        yield s1.courses().attach(give)
        yield Database.table('trades').where('id', id).delete()
        yield response.redirect('/')
    }

    * main(request, response) {
        const isLoggedIn = yield request.auth.check()
        if (!isLoggedIn) {
            response.redirect('/login')
        }
        yield response.sendView('main')
    }
}

module.exports = NeptunController
