const DAOUsers = require('../DAO/DAOUsers')


class Groups {
  constructor(name, listOfUsers){
    this.name = name;
    this.listOfUsers = listOfUsers;
  }

  get getName(){
    return this.name;
  }

  get getListOfUsers(){
    return this.listOfUsers;
  }

  toString(){
    return '{Groups : ' + this.name + ' , ' + this.listOfUsers + '}';
  }
}
module.exports = Groups;
