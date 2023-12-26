import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUserDtp } from './dto/create-user-dto';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }
  async createUser(newUserDtp: NewUserDtp): Promise<void> {
    const { username, password } = newUserDtp;
    const user = this.userRepository.create({
      username,
      password,
    });
    const result = await this.userRepository.save(user);
    console.log(result);
  }
}
