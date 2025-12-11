import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ExampleDto } from '@/app.dto';
import { AppService } from '@/app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get hello message' })
  @ApiResponse({ status: 200, description: 'Return hello message.' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('example')
  @ApiOperation({ summary: 'Example endpoint using DTO' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ExampleDto,
  })
  createExample(@Body() exampleDto: ExampleDto): ExampleDto {
    return exampleDto;
  }
}
