import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Aplicación creada, configurando global pipes...');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('Aplicación corriendo en http://localhost:3000');
}
bootstrap();

