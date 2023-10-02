import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /**
   * getTasks
   * @returns {Task[]}
   */
  public getTasks(): Task[] {
    return this.tasks;
  }

  /**
   * getFilteredTasks
   * @param taskFilterDto {taskFilterDto}
   * @returns {Task[]}
   */
  public getFilteredTasks(taskFilterDto: GetTasksFilterDto): Task[] {
    const { status, search } = taskFilterDto;
    let tasks = this.getTasks();

    if (status) {
      tasks = tasks.filter(({ status: taskStatus }) => taskStatus === status);
    }

    if (search) {
      tasks = tasks.filter(({ title, description }) => {
        return title.includes(search) || description.includes(search);
      });
    }

    return tasks;
  }

  /**
   * getTaskById
   * @param id {string}
   * @returns {Task}
   */
  public getTaskById(id: string): Task {
    return this.tasks.find(({ id: taskId }) => taskId === id);
  }

  /**
   * createTask
   * @param createTaskDto {CreteTaskDto}
   * @returns {Task}
   */
  public createTask({ title, description }): Task {
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.TODO,
    };

    this.tasks.push(task);

    return task;
  }

  /**
   * updateTaskStatus
   * @param id {string}
   * @param status {TaskStatus}
   * @returns {Task}
   */
  public updateTaskStatusById({ id, status }): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  /**
   * removeTask
   * @param id {string}
   * @returns {void}
   */
  public removeTaskById(id: string): void {
    this.tasks = this.tasks.filter(({ id: taskId }) => taskId !== id);
  }
}
