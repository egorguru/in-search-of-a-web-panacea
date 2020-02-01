import { Controller, Get, HttpCode, Param, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TinyEntity, LargeEntity, TinyEntityWithId } from './message.interface';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-tiny-json-entity')
  getTinyJsonEntity(): TinyEntity {
    return this.appService.getTinyJsonEntity();
  }

  @Get('get-large-json-entity')
  getLargeJsonEntity(): LargeEntity {
    return this.appService.getLargeJsonEntity();
  }

  @Post('post-tiny-json-entity')
  @HttpCode(201)
  postTinyJsonEntity(@Body() tinyEntity: TinyEntity): TinyEntity {
    return tinyEntity;
  }

  @Post('post-large-json-entity')
  @HttpCode(201)
  postLargeJsonEntity(@Body() largeEntity: LargeEntity): LargeEntity {
    return largeEntity;
  }

  @Get('get-plain-text')
  getPlainText(): string {
    return this.appService.getPlainText();
  }

  @Get('get-tiny-json-entity-by-id/:id')
  getTinyJsonEntityById(@Param() params): TinyEntityWithId {
    return this.appService.getTinyJsonEntityById(Number(params.id));
  }
}
