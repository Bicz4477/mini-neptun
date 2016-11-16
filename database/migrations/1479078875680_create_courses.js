'use strict'

const Schema = use('Schema')

class CoursesTableSchema extends Schema {

  up () {
    this.create('courses', (table) => {
      table.increments('id')
      table.integer('headcount').notNullable()
      table.integer('max_headcount').notNullable()
      table.integer('lecturer')
      table.integer('subject_id')
      table.string('room', 254)
      table.string('class_schedule', 254)
      table.foreign('lecturer').references('Teacher.id')
      table.foreign('subject_id').references('Subject.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('courses')
  }

}

module.exports = CoursesTableSchema
