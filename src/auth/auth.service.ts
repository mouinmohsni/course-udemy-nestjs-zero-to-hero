import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NewUserDtp } from './dto/create-user-dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(newUserDtp: NewUserDtp): Promise<void> {
    const { username, password } = newUserDtp;
    //hash
    const salt = await bcrypt.genSalt();
    console.log(salt);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashPassword,
    });
    try {
      const result = await this.userRepository.save(user);
      console.log(result);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException(' UserName already excist');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return;
  }

  async signIn(newUserDtp: NewUserDtp): Promise<string> {
    const { username, password } = newUserDtp;
    const user = await this.userRepository.findOneBy({ username });
    console.log(user, 'user');
    if (user && bcrypt.compare(password, user.password)) {
      return 'token';
    } else {
      throw new InternalServerErrorException(
        'please check your login credential',
      );
    }
  }
}
