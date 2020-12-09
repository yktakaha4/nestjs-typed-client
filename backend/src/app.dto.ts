import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  GreetErrors,
  greetErrorSchemaPaths,
  EmptyNameError,
  VulgarNameError,
} from './app.error';

export class GreetRequest {
  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly firstName: string;

  constructor(lastName: string, firstName: string) {
    this.lastName = lastName;
    this.firstName = firstName;
  }
}

@ApiExtraModels(EmptyNameError, VulgarNameError)
export class GreetResponse {
  @ApiProperty({ type: String, nullable: true })
  readonly message: string | null;

  @ApiProperty({
    type: 'array',
    items: { oneOf: greetErrorSchemaPaths },
  })
  readonly errors: GreetErrors;

  constructor(message: string | null, errors: GreetErrors) {
    this.message = message;
    this.errors = errors;
  }
}
