import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const port = 3100;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
