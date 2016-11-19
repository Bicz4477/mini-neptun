'use strict'

const Lucid = use('Lucid')

class Course extends Lucid {

    subject() {
        return this.belongsTo('App/Model/Subject')
    }
    
    teacher() {
        return this.belongsTo('App/Model/Teacher', 'user_id', 'lecturer')
    }

    student() {
        return this.belongsToMany('App/Model/Student', 'mx_course_student')
    }
}

module.exports = Course
