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
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(newUserDtp: NewUserDtp): Promise<void> {
    const { username, password } = newUserDtp;
    //hash
    const salt = await bcrypt.genSalt();
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

  async signIn(newUserDtp: NewUserDtp): Promise<{ accessToken: string }> {
    const { username, password } = newUserDtp;
    const user = await this.userRepository.findOneBy({ username });
    console.log(user, 'user');
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new InternalServerErrorException(
        'please check your login credential',
      );
    }
  }
}
