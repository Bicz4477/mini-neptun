'use strict'

const Schema = use('Schema')

class TeachersTableSchema extends Schema {

  up () {
    this.create('teachers', (table) => {
      table.increments('id')
      table.integer('user_id').notNullable()
      table.string('room', 20)
      table.string('consulting_hours', 20)
      table.timestamps()
      table.foreign('user_id').references('users.id')
    })
  }

  down () {
    this.drop('teachers')
  }

}

module.exports = TeachersTableSchema
