import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { safeDump } from 'js-yaml';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { cwd, exit } from 'process';
import { port } from '../src/main';

const exportOpenAPIDocument = async () => {
  const app = await NestFactory.create(AppModule);

  const builder = new DocumentBuilder()
    .setTitle('Sample Backend')
    .setDescription('Sample Backend')
    .setVersion(new Date().getTime().toString())
    .addServer(`http://localhost:${port}`, 'local');

  const document = SwaggerModule.createDocument(app, builder.build());
  const yamlDocument = safeDump(document, {
    skipInvalid: true,
    noRefs: true,
  });
  const yamlPath = join(cwd(), 'client', 'sample-backend.yml');

  writeFileSync(yamlPath, yamlDocument);
};

exportOpenAPIDocument()
  .then(() => exit(0))
  .catch(console.error);
