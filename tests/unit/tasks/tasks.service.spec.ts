import { Test, TestingModule } from '@nestjs/testing';
import { TasksRepository } from '../../../src/tasks/tasks.repository';
import { TasksService } from '../../../src/tasks/tasks.service';
import { NotFoundException } from '@nestjs/common';
import TaskMock from '../../mocks/task.mock';
import UserMock from '../../mocks/user.mock';

const mckTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mckTasksRepository },
      ],
    }).compile();

    tasksService = moduleFixture.get(TasksService);
    tasksRepository = moduleFixture.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('should get all tasks', async () => {
      tasksRepository.getTasks.mockResolvedValue([TaskMock]);

      const tasks = await tasksService.getTasks(null, UserMock);

      expect(tasks).toEqual([TaskMock]);
    });
  });

  describe('getTasksById', () => {
    it('should get a single task by Id', async () => {
      tasksRepository.findOne.mockResolvedValue(TaskMock);

      const task = await tasksService.getTaskById('123');
      expect(task).toEqual(TaskMock);
    });

    it('should handle error when task not found', async () => {
      tasksRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById('123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
