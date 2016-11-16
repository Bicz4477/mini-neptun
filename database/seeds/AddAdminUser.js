'use strict'

const Factory = use('Factory')
const User = use('App/Model/User')
const Hash = use('Hash')

class AddAdminUserSeeder {

  * run () {
    const admin = new User()
    admin.username = "admin"
    admin.password = yield Hash.make("alma")
    admin.email = "admin@admin"
    admin.type = "admin"
    admin.full_name = "Admin"
    yield admin.save()
  }

}

module.exports = AddAdminUserSeeder
