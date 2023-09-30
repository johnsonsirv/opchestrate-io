import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  /**
   * getTasks
   * returns all tasks
   */
  public getTasks(): Task[] {
    const { taskService } = this;

    return taskService.getTasks();
  }

  @Post()
  /**
   * createTask
   */
  public createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.taskService.createTask({ title, description });
  }
}
