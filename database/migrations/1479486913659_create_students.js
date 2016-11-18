'use strict'

const Schema = use('Schema')

class StudentsTableSchema extends Schema {

  up () {
    this.create('students', (table) => {
      table.increments('id')
      table.integer('user_id').notNullable()
      table.foreign('user_id').references('users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('students')
  }

}

module.exports = StudentsTableSchema
