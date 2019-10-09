const DAOUsers = require('../DAO/DAOUsers')


class Groups {
  constructor(id, name, listOfUsers){
    this.id = id;
    this.name = name;
    this.listOfUsers = listOfUsers;
  }

  get getId(){
    return this.id;
  }

  get getName(){
    return this.name;
  }

  get getListOfUsers(){
    return this.listOfUsers;
  }

  toString(){
    return '{Groups ' + this.id + ' : ' + this.name + ' , ' + this.listOfUsers + '}';
  }
}
module.exports = Groups;
