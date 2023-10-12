import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from '../entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  /**
   * getTasks
   * @returns {Task[]}
   */
  public getTasks(
    @Query() taskFilterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(taskFilterDto, user);
  }

  @Get(':id')
  /**
   * getTaskById
   * @returns {Promise<Task>}
   */
  public async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  /**
   * createTask
   *  @returns {Task}
   */
  public createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
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
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatusById({ id, status, user });
  }

  @Delete(':id')
  /**
   * removeTaskById
   * @param id {string}
   * @returns {void}
   */
  public removeTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.taskService.removeTaskById(id, user);
  }
}
