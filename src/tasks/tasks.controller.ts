import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

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
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
}
