class Users {

  /**
   * Represents a User
   * @constructor
   * @params {int} id - id of User
   * @params {string} name - name of user
   * @params {string} surname - surname of user
   */
  constructor(id, name, surname){
    this.idUser = id;
    this.nameUser = name;
    this.surnameUser = surname;
  }

  /**
   * get id of User
   */
  get getId(){
    return this.idUser;
  }

  /**
   * get name of User
   */
  get getName(){
    return this.nameUser;
  }

  /**
   * get surname of User
   */
  get getSurname(){
    return this.surnameUser;
  }

  /**
   * show this User with all parameters
   */
  toString(){
    return '{user  ' + this.idUser + ' : ' + this.surnameUser + ' , ' + this.nameUser + ' }';
  }
}
module.exports = Users;
