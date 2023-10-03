import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // /**
  //  * getTasks
  //  * @returns {Task[]}
  //  */
  // public getTasks(@Query() taskFilterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(taskFilterDto).length) {
  //     return this.taskService.getFilteredTasks(taskFilterDto);
  //   }

  //   return this.taskService.getTasks();
  // }

  // @Get(':id')
  // /**
  //  * getTaskById
  //  * @returns {Task}
  //  */
  // public getTaskById(@Param('id') id: string): Task {
  //   return this.taskService.getTaskById(id);
  // }

  // @Post()
  // /**
  //  * createTask
  //  *  @returns {Task}
  //  */
  // public createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.taskService.createTask(createTaskDto);
  // }

  // @Patch(':id/status')
  // /**
  //  * updateTaskStatus
  //  * @param id {string}
  //  * @param status {TaskStatus}
  //  * @returns {Task}
  //  */
  // public updateTaskStatusById(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.taskService.updateTaskStatusById({ id, status });
  // }

  // @Delete(':id')
  // /**
  //  * removeTaskById
  //  * @param id {string}
  //  * @returns {void}
  //  */
  // public removeTaskById(@Param('id') id: string): void {
  //   return this.taskService.removeTaskById(id);
  // }
}
