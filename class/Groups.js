const DAOUsers = require('../DAO/DAOUsers')


class Groups {
  constructor(id, name, listOfUsers){
    this.idGroup = id;
    this.nameGroup = name;
    this.listOfUsersGroup = listOfUsers;
  }

  get getId(){
    return this.idGroup;
  }

  get getName(){
    return this.nameGroup;
  }

  get getListOfUsers(){
    return this.listOfUsersGroup;
  }

  toString(){
    return '{Groups ' + this.idGroup + ' : ' + this.nameGroup + ' , ' + this.listOfUsersGroup + '}';
  }
}
module.exports = Groups;
