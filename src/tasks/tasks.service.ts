import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  /**
   * getTasks
   * @returns {Task[]}
   */
  public getTasks(taskFilterDto: GetTasksFilterDto): Promise<Task[]> {
    // using a query builder
    return this.tasksRepository.getTasks(taskFilterDto);
  }

  /**
   * getTaskById
   * @param id {string}
   * @returns {Promise<Task>}
   */
  public async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }
  /**
   * createTask
   * @param createTaskDto {CreteTaskDto}
   * @returns {Task}
   */
  public createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  /**
   * updateTaskStatus
   * @param id {string}
   * @param status {TaskStatus}
   * @returns {Promise<Task>}
   */
  public async updateTaskStatusById({ id, status }): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }

  /**
   * removeTask
   * @param id {string}
   * @returns {Promise<void>}
   */
  public async removeTaskById(id: string): Promise<void> {
    const { affected: rowsAffected } = await this.tasksRepository.delete(id);

    if (rowsAffected === 0) {
      throw new NotFoundException();
    }
  }
}
