import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { GreetingRequest, GreetingResponse } from './app.dto';
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

  @ApiOkResponse({ type: GreetingResponse })
  @ApiOperation({ operationId: 'greet' })
  @Post('greet')
  @HttpCode(200)
  greet(@Body() request: GreetingRequest): GreetingResponse {
    const { lastName, firstName } = request;
    const message = this.appService.getGreetingMessage(lastName, firstName);

    return new GreetingResponse(message);
  }
}
