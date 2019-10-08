class Users {
  constructor(name, surname){
    this.surname = surname;
    this.name = name;
  }

  get getSurname(){
    return this.surname;
  }

  get getName(){
    return this.name;
  }

  toString(){
    return '{user : ' + this.surname + ' , ' + this.name + ' }';
  }
}
module.exports = Users;
