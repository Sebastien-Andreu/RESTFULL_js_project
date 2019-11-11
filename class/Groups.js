class Groups {

  /**
   * Represents a Group
   * @constructor
   * @params {int} id - id of Group
   * @params {string} name - name of Group
   * @params {string} listOfUsers - list of Users
   */
  constructor(id, name, listOfUsers){
    this.idGroup = id;
    this.nameGroup = name;
    this.listOfUsersGroup = listOfUsers;
  }

  /**
   * get id of Group
   */
  get getId(){
    return this.idGroup;
  }

  /**
   * get name of Group
   */
  get getName(){
    return this.nameGroup;
  }

  /**
   * get list of User in this Group
   */
  get getListOfUsers(){
    return this.listOfUsersGroup;
  }

  /**
   * show this Group with all parameters
   */
  toString(){
    return '{Groups ' + this.idGroup + ' : ' + this.nameGroup + ' , ' + this.listOfUsersGroup + '}';
  }
}
module.exports = Groups;
