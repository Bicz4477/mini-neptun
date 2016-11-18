'use strict'

const Lucid = use('Lucid')
const User = use('App/Model/User')

class Teacher extends Lucid   {

    user() {
        return this.belongsTo('App/Model/User', 'id', 'teacher_id')
    }

}

module.exports = Teacher
