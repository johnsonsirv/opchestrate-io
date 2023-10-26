import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../entities/user.entity';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  /**
   * getTasks
   * @returns {Promise<Task[]>}
   */
  public getTasks(
    taskFilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    return this.tasksRepository.getTasks(taskFilterDto, user);
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
   * @returns {Promise<Task>}
   */
  public createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  /**
   * updateTaskStatus
   * @param id {string}
   * @param status {TaskStatus}
   * @returns {Promise<Task>}
   */
  public async updateTaskStatusById({ id, status, user }): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id, user } });

    if (!task) {
      throw new NotFoundException();
    }

    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }

  /**
   * removeTask
   * @param id {string}
   * @returns {Promise<void>}
   */
  public async removeTaskById(id: string, user: User): Promise<void> {
    const { affected: rowsAffected } = await this.tasksRepository.delete({
      id,
      user: user as FindOptionsWhere<User>,
    });

    if (rowsAffected === 0) {
      throw new NotFoundException();
    }
  }
}
