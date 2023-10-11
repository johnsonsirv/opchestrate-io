import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

export enum UserErrors {
  DUPLICATE_RECORD = 23505,
}

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * createUser
   * @param authCredentialsDto
   * @returns {Promise<void>}
   */
  public async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt: string = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: User = this.create({ username, password: hashedPassword });

    await this.save(user);
  }
}
