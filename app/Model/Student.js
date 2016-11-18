'use strict'

const Lucid = use('Lucid')

class Student extends Lucid {

    user() {
        return this.belongsTo('App/Model/User', 'id', 'user_id')
    }

    courses() {
        return this.belongsToMany('App/Model/Course', 'mx_course_student')
    }

}

module.exports = Student
