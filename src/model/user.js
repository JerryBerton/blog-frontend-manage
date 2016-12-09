import { observable, computed, action } from 'mobx';

export default class User {
  @observable userList = [];
  @computed get completedTodosCount() {
   return this.userList.filter(item => todo.completed === true).length;
 }
  @action addTodo(task) {
    this.userList.push({ ...task, completed: false });
  }
}
