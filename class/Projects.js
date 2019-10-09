class Projects {
  constructor(id, name, desc, group){
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.group = group;
  }

  get getId(){
    return this.id;
  }

  get getDesc(){
    return this.desc;
  }

  get getName(){
    return this.name;
  }

  get getGroup(){
    return this.group
  }

  toString(){
    return '{Project ' + this.id + ' : ' + this.name + ' , ' + this.desc + ' , ' + this.group +' }';
  }
}
module.exports = Projects;
