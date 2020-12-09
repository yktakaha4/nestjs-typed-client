import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { GreetRequest, GreetResponse } from './app.dto';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ operationId: 'getHello' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOkResponse({ type: GreetResponse })
  @ApiOperation({ operationId: 'greet' })
  @Post('greet')
  @HttpCode(200)
  greet(@Body() request: GreetRequest): GreetResponse {
    // 入力チェック
    const errors = this.appService.validateGreetRequest(request);

    let message: string | null = null;
    if (errors.length === 0) {
      // エラーなしの場合のみメッセージを取得
      message = this.appService.getGreetingMessage(request);
    }

    return new GreetResponse(message, errors);
  }
}
