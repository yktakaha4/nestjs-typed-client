import { Injectable } from '@nestjs/common';
import { GreetRequest } from './app.dto';
import {
  EmptyNameError,
  GreetErrors,
  VulgarNameError,
  GreetParameter,
} from './app.error';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  validateGreetRequest(request: GreetRequest): GreetErrors {
    // 共通処理
    const validateName = (parameter: GreetParameter, value: string) => {
      const errors: GreetErrors = [];

      const name = value.trim().toLowerCase();
      if (name === '') {
        // 名前が空
        errors.push(new EmptyNameError(parameter));
      }

      const vulgarWord = ['poop', 'shit'].find((word) => word === name);
      if (vulgarWord) {
        // 名前に下品な言葉が含まれる
        errors.push(new VulgarNameError(parameter, vulgarWord));
      }

      return errors;
    };

    const errors: GreetErrors = [];
    // 名前のチェック
    errors.push(...validateName('LastName', request.lastName));
    // 苗字のチェック
    errors.push(...validateName('FirstName', request.firstName));

    return errors;
  }

  getGreetingMessage(request: GreetRequest): string {
    const lastName = `${request.lastName
      .trim()
      .slice(0, 1)
      .toUpperCase()}${request.lastName.trim().slice(1).toLowerCase()}`;

    const firstName = request.firstName.trim().toUpperCase();

    return `Hello, ${lastName} ${firstName} !`;
  }
}
