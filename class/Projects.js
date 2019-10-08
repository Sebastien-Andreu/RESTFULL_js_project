class Projects {
  constructor(name, desc, group){
    this.name = name;
    this.desc = desc;
    this.group = group;
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
    return '{Project : ' + this.name + ' , ' + this.desc + ' , ' + this.group +' }';
  }
}
module.exports = Projects;
