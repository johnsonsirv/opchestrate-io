import { DataSource, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status-enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository', { timestamp: true });
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

    try {
      const tasks = await query.getMany();

      return tasks;
    } catch (error) {
      this.logger.error(
        JSON.stringify({
          error: error.stack,
          message: 'getTasks error',
        }),
      );
      throw new InternalServerErrorException();
    }
  }
}
