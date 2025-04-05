import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'qwerty',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [JwtModule],
})
export class GlobalJwtModule {}
