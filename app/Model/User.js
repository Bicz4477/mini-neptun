'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  teacher () {
    return this.hasOne('App/Model/Teacher', 'id', 'user_id')
  }

  student () {
    return this.hasOne('App/Model/Student', 'id', 'user_id')
  }

}

module.exports = User
