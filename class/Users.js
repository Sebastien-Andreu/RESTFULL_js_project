class Users {
  constructor(id, name, surname){
    this.id = id;
    this.name = name;
    this.surname = surname;
  }

  get getId(){
    return this.id;
  }

  get getName(){
    return this.name;
  }

  get getSurname(){
    return this.surname;
  }

  toString(){
    return '{user  ' + this.id + ' : ' + this.surname + ' , ' + this.name + ' }';
  }
}
module.exports = Users;
