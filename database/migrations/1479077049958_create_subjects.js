'use strict'

const Schema = use('Schema')

class SubjectsTableSchema extends Schema {

  up () {
    this.create('subjects', (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('credit').notNullable()
      table.string('description', 254)
      table.string('web', 254)
      table.integer('lecturer').notNullable()
      table.foreign('lecturer').references('teachers.teacher_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('subjects')
  }

}

module.exports = SubjectsTableSchema
