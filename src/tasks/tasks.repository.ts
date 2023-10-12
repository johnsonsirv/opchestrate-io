import { DataSource, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status-enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  public async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const task: Task = this.create({
      ...createTaskDto,
      status: TaskStatus.TODO,
      user,
    });

    await this.save(task);

    return task;
  }

  public async getTasks(
    taskFilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    query.where({ user });

    const { search, status } = taskFilterDto;

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
