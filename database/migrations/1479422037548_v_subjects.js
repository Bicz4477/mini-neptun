'use strict'

const Schema = use('Schema')

class VSubjectsTableSchema extends Schema {

  up () {
    this.raw('CREATE VIEW v_subjects as SELECT subjects.id, subjects.name, subjects.credit, users.full_name responsible_lecturer, users.id user_id FROM subjects JOIN users on subjects.lecturer = users.id')
  }

  down () {
    this.raw('DROP VIEW v_subjects')
  }

}

module.exports = VSubjectsTableSchema
