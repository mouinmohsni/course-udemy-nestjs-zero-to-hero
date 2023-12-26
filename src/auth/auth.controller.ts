import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDtp } from './dto/create-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() newUserDtp: NewUserDtp): Promise<void> {
    return this.authService.signUp(newUserDtp);
  }
  @Post('/signin')
  signIn(@Body() newUserDtp: NewUserDtp): Promise<string> {
    return this.authService.signIn(newUserDtp);
  }
}
