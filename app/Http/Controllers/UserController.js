'use strict'


const Validator = use('Validator')
const User = use('App/Model/User')
const Teacher = use('App/Model/Teacher')
const Student = use('App/Model/Student')
const Hash = use('Hash')

class UserController {
    * register(request, response) {
        if (request.currentUser.type != 'admin') {
            response.redirect('/')
        }
        yield response.sendView('registration')
    }

    * doRegister(request, response) {
        if (request.currentUser.type != 'admin') {
            response.redirect('/')
        }
        const registerData = request.except('_csrf');

        const rules = {
            username: 'required|alpha_numeric|unique:users',
            email: 'required|email|unique:users',
            password: 'required|min:4',
            password_confirm: 'required|same:password',
            full_name: 'required',
        };

        const validation = yield Validator.validateAll(registerData, rules)

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            response.redirect('back')
            return
        }

        const user = new User()

        user.username = registerData.username
        user.email = registerData.email
        user.password = yield Hash.make(registerData.password)
        user.full_name = registerData.full_name
        user.type = registerData.typeSelect

        yield user.save()

        if (registerData.typeSelect == 'teacher') {
            const teacher = new Teacher()
            //const teacher = yield Teacher.create({ teacher_id: user.id})
            teacher.teacher_id = user.id
            //console.log(user)
            //console.log(teacher)
            //yield user.teacher().create({ teacher_id: user.id})
            yield user.teacher().save(teacher)
        } else {
            const student = new Student()
            student.user_id = user.id
            yield user.student().save(student)
        }


        response.redirect('/')
    }

    * login(request, response) {
        const isLoggedIn = yield request.auth.check()
        if (isLoggedIn) {
            response.redirect('/')
        }

        yield response.sendView('login')
    }

    * doLogin(request, response) {
        const username = request.input('username')
        const password = request.input('password')

        try {
            const login = yield request.auth.attempt(username, password)

            if (login) {
                response.redirect('/')
                return
            }
        }
        catch (err) {
            yield request
                .withAll()
                .andWith({
                    errors: [
                        {
                            message: 'Hibás Neptun kód vagy jelszó'
                        }
                    ]
                })
                .flash()

            response.redirect('/login')
        }
    }

    * logout(request, response) {
        yield request.auth.logout()
        response.redirect('login')
    }

    * profileEdit(request, response) {
        const user = yield User.find(request.currentUser.id)
        const teacher = yield Teacher.findBy('teacher_id', request.currentUser.id)
        if (teacher != null ) {
           yield response.sendView('profile', { teacher: teacher.toJSON(), user: user.toJSON() })
        }else{
           yield response.sendView('profile', { teacher: user.toJSON(), user: user.toJSON() })
        }
    }

    * profileShow(request, response) {
        const user = yield User.find(request.input('id'))
        const teacher = yield Teacher.findBy('teacher_id', request.currentUser.id)
        if (teacher != null ) {
           yield response.sendView('showProfile', { teacher: teacher.toJSON(), user: user.toJSON() })
        }else{
           yield response.sendView('showProfile', { teacher: user.toJSON(), user: user.toJSON() })
        }
    }

    * saveChanges(request, response) {
        const registerData = request.except('_csrf');
        const user = yield User.find(request.currentUser.id)
        const teacher = yield Teacher.findBy('teacher_id', request.currentUser.id)
        if (registerData.password) {
            const rules = {
                password: 'required|min:4',
                password_confirm: 'required|same:password',
            };

            const validation = yield Validator.validateAll(registerData, rules)

            if (validation.fails()) {
                yield request
                    .withAll()
                    .andWith({ errors: validation.messages() })
                    .flash()
                response.redirect('back')
                return
            }
            user.password = yield Hash.make(registerData.password)
        }
        user.web = registerData.web
        user.phone = registerData.phone
        if (teacher) {
            teacher.room = registerData.room
            teacher.consulting_hours = registerData.consulting_hours
            yield teacher.save()
        }
        yield user.save()
        response.redirect('/')
    }
}
module.exports = UserController
