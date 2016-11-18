'use strict'

const Schema = use('Schema')

class TeachersTableSchema extends Schema {

  up () {
    this.create('teachers', (table) => {
      table.increments('id')
      table.integer('teacher_id').notNullable()
      table.timestamps()
      table.foreign('teacher_id').references('users.id')
    })
  }

  down () {
    this.drop('teachers')
  }

}

module.exports = TeachersTableSchema
