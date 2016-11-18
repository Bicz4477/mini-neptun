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
      table.boolean('isClosed')
      table.foreign('lecturer').references('teachers.teacher_id')
      table.foreign('subject_id').references('subjects.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('courses')
  }

}

module.exports = CoursesTableSchema
