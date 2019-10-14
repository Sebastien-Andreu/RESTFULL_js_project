class Projects {
  constructor(id, name, desc, group){
    this.idProject = id;
    this.nameProject = name;
    this.descProject = desc;
    this.groupProject = group;
  }

  get getId(){
    return this.idProject;
  }

  get getDesc(){
    return this.descProject;
  }

  get getName(){
    return this.nameProject;
  }

  get getGroup(){
    return this.groupProject
  }

  toString(){
    return '{Project ' + this.idProject + ' : ' + this.nameProject + ' , ' + this.descProject + ' , ' + this.groupProject +' }';
  }
}
module.exports = Projects;
