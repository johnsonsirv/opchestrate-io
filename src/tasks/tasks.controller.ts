import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  /**
   * getTasks
   * @returns {Task[]}
   */
  public getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Get(':id')
  /**
   * getTaskById
   * @returns {Task}
   */
  public getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  /**
   * createTask
   *  @returns {Task}
   */
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch(':id/status')
  /**
   * updateTaskStatus
   * @param id {string}
   * @param status {TaskStatus}
   * @returns {Task}
   */
  public updateTaskStatusById(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatusById({ id, status });
  }

  @Delete(':id')
  /**
   * removeTaskById
   * @param id {string}
   * @returns {void}
   */
  public removeTaskById(@Param('id') id: string): void {
    return this.taskService.removeTaskById(id);
  }
}
