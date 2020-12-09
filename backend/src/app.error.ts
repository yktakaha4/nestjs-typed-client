import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export const GreetParameter = {
  LastName: 'LastName',
  FirstName: 'FirstName',
} as const;
export type GreetParameter = typeof GreetParameter[keyof typeof GreetParameter];

export const EmptyNameErrorType = {
  Value: 'EmptyNameError',
} as const;
export type EmptyNameErrorType = typeof EmptyNameErrorType[keyof typeof EmptyNameErrorType];

export const VulgarNameErrorType = {
  Value: 'VulgarNameError',
} as const;
export type VulgarNameErrorType = typeof VulgarNameErrorType[keyof typeof VulgarNameErrorType];

export class EmptyNameError {
  // 空の名前を示すエラーオブジェクト

  @ApiProperty({ enum: EmptyNameErrorType })
  readonly type = EmptyNameErrorType.Value;

  @ApiProperty({ enum: GreetParameter })
  readonly parameter: GreetParameter;

  constructor(parameter: GreetParameter) {
    this.parameter = parameter;
  }
}

export class VulgarNameError {
  // 下品な名前を示すエラーオブジェクト

  @ApiProperty({ enum: VulgarNameErrorType })
  readonly type = VulgarNameErrorType.Value;

  @ApiProperty({ enum: GreetParameter })
  readonly parameter: GreetParameter;

  @ApiProperty()
  readonly vulgarWord: string;

  constructor(parameter: GreetParameter, vulgarWord: string) {
    this.parameter = parameter;
    this.vulgarWord = vulgarWord;
  }
}

export type GreetErrors = Array<EmptyNameError | VulgarNameError>;

export const greetErrorSchemaPaths = [
  { $ref: getSchemaPath(EmptyNameError) },
  { $ref: getSchemaPath(VulgarNameError) },
];
