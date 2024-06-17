import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { rmqConfig } from './config/queue/rmq.config';
import { ResponseExceptionsFilter } from './shared/filters/response-exception.filter';
import { ResponseTransformInterceptor } from './shared/interceptors/response-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new ResponseExceptionsFilter());

  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>(
    rmqConfig(app.get(ConfigService), 'mail.enviar-email'),
  );

  await app.startAllMicroservices();

  setupOpenAPI(app);

  await app.listen(3002);
}
bootstrap();

function setupOpenAPI(app: INestApplication): void {
  const config = new DocumentBuilder().setTitle('APIEmail').build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true });

  Logger.log('OpenAPI is running on http://localhost:3002/api/v1/docs');
}
