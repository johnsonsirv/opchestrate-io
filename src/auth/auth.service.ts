import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserErrors, UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * signUp
   * @param authCredentialsDto
   * @returns {Promise<void>}
   */
  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      await this.usersRepository.createUser(authCredentialsDto);
    } catch (error) {
      if (error.code === UserErrors.DUPLICATE_RECORD.toString()) {
        throw new ConflictException('Username already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  /**
   * signIn
   * @param authCredentialsDto
   * @return {Promise<string>}
   */
  public async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user: User = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const match: boolean = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = { username };
    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
