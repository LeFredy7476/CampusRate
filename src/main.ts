import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { securityConfig } from './config/security.config.js';
import { validationConfig } from './config/validation.config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  securityConfig(app);
  validationConfig(app);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
