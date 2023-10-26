import { User } from '../../src/entities/user.entity';

const UserMock: User = {
  id: '123',
  username: 'user1',
  password: 'pass',
  tasks: [],
  created_at: new Date(),
  updated_at: new Date(),
  updateCreatedAt: jest.fn,
  updateUpdatedAt: jest.fn,
};

export default UserMock;
