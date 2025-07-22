import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join, resolve } from 'path';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const frontendPath = join(__dirname, '..', '..', 'frontend', 'build');
  app.use(express.static(frontendPath));

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get(/^(?!\/api).*/, (req: any, res: any) => {
    res.sendFile(join(frontendPath, 'index.html'));
  });

  process.on('uncaughtException', (err) => {
    console.error('🔥 uncaughtException:', err);
  });

  await app.listen(3001);
  console.log(`http://localhost:3001`);
}
bootstrap();

