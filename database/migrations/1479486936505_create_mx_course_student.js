'use strict'

const Schema = use('Schema')

class MxCourseStudentTableSchema extends Schema {

  up () {
    this.create('mx_course_student', (table) => {
      table.integer('student_id').notNullable()
      table.integer('course_id').notNullable()
      table.foreign('student_id').references('students.id')
      table.foreign('course_id').references('courses.id')
    })
  }

  down () {
    this.drop('mx_course_student')
  }

}

module.exports = MxCourseStudentTableSchema
