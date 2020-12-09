import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getGreetingMessage(lastName: string, firstName: string): string {
    const format = (value?: string) => value?.trim().toUpperCase() ?? '';

    return `Hello, ${format(firstName)} ${format(lastName)} !`;
  }
}
