'use strict'


const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')

class UserController {
    * register(request, response) {
        if (request.currentUser.type != 'admin') {
           // response.redirect('/')
        }
        yield response.sendView('registration')
    }

    * doRegister(request, response) {
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

    * logout(request, response){
        yield request.auth.logout()
        response.redirect('login')
    }
}

module.exports = UserController
