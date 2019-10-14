class Users {
  constructor(id, name, surname){
    this.idUser = id;
    this.nameUser = name;
    this.surnameUser = surname;
  }

  get getId(){
    return this.idUser;
  }

  get getName(){
    return this.nameUser;
  }

  get getSurname(){
    return this.surnameUser;
  }

  toString(){
    return '{user  ' + this.idUser + ' : ' + this.surnameUser + ' , ' + this.nameUser + ' }';
  }
}
module.exports = Users;
