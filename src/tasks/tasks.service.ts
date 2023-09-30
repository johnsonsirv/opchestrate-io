import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /**
   * getTasks
   * returns @this.tasks
   */
  public getTasks(): Task[] {
    return this.tasks;
  }

  /**
   * createTask
   * @param createTaskDto {CreteTaskDto}
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
}
