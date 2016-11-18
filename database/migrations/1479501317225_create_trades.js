'use strict'

const Schema = use('Schema')

class TradeTableSchema extends Schema {

  up () {
    this.create('trades', (table) => {
      table.increments()
      table.integer('student_id').notNullable()
      table.integer('give_course_id').notNullable()
      table.integer('wanted_course_id').notNullable()
      table.timestamps()
      table.foreign('student_id').references('students.id')
      table.foreign('give_course_id').references('courses.id')
      table.foreign('wanted_course_id').references('courses.id')
    })
  }

  down () {
    this.drop('trades')
  }

}

module.exports = TradeTableSchema
