import { TaskStatus } from '../../src/tasks/tasks-status-enum';
import { Task } from '../../src/entities/task.entity';

const TaskMock: Task = {
  id: '123',
  title: 'title',
  description: 'description',
  status: TaskStatus.TODO,
  created_at: new Date(),
  updated_at: new Date(),
  updateCreatedAt: jest.fn,
  updateUpdatedAt: jest.fn,
  user: null,
};

export default TaskMock;
