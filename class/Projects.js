class Projects {

  /**
   * Represents a Project
   * @constructor
   * @params {int} id - id of Project
   * @params {string} name - name of Project
   * @params {string} desc - surname of Project
   * @params {string} group - group in Project
   */
  constructor(id, name, desc, group){
    this.idProject = id;
    this.nameProject = name;
    this.descProject = desc;
    this.groupProject = group;
  }

  /**
   * get id of Project
   */
  get getId(){
    return this.idProject;
  }

  /**
   * get desc of Project
   */
  get getDesc(){
    return this.descProject;
  }

  /**
   * get name of Project
   */
  get getName(){
    return this.nameProject;
  }

  /**
   * get Group of Project
   */
  get getGroup(){
    return this.groupProject
  }

  /**
   * show this Project with all parameters
   */
  toString(){
    return '{Project ' + this.idProject + ' : ' + this.nameProject + ' , ' + this.descProject + ' , ' + this.groupProject +' }';
  }
}
module.exports = Projects;
