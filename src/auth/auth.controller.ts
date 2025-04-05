import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Ruta para registrar un nuevo usuario
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.register(signupDto.email, signupDto.name, signupDto.password);
  }

  // Ruta para iniciar sesión
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
