import { ApiProperty } from '@nestjs/swagger';

export class GreetingRequest {
  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly firstName: string;

  constructor(lastName: string, firstName: string) {
    this.lastName = lastName;
    this.firstName = firstName;
  }
}

export class GreetingResponse {
  @ApiProperty()
  readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
