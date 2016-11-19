'use strict'

const Lucid = use('Lucid')

class Subject extends Lucid {
    
    teacher() {
        return this.belongsTo('App/Model/Teacher', 'user_id', 'lecturer');
    }

    courses() {
        return this.hasMany('App/Model/Course');
    }
}

module.exports = Subject
