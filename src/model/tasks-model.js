import { generateTask } from '../mock/task.js';

export default class TaskModel {
  tasks = Array.from({ length: 15 }, generateTask);

  getTasks() {
    return this.tasks;
  }
}
