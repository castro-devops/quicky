import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VendorsModule } from './http/vendors/vendors.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Quicky API')
    .setDescription(
      'Aqui você encontra a disposição básica dos métodos disponíveis, este é apenas um documento simples de orientação, outro muito mais robusto está a caminho, então qualquer dúvida estamos por aqui.',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      include: [VendorsModule],
    });
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
