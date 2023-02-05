import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { createApiPropertyDecorator } from '@nestjs/swagger/dist/decorators/api-property.decorator';

import { ApikeyService } from './apikey.service';
import { CreateApikeyDto } from './dto/create-apikey.dto';
import { UpdateApikeyDto } from './dto/update-apikey.dto';
import { ApikeyEntity } from './entities/apikey.entity';

@Controller('apikey')
@ApiTags('API Key')
export class ApikeyController {
  constructor(private readonly apikeyService: ApikeyService) {}

  @Post()
  @ApiCreatedResponse({ type: ApikeyEntity })
  create(@Body() createApikeyDto: CreateApikeyDto) {
    return this.apikeyService.create(createApikeyDto);
  }

  @Get()
  findAll() {
    return this.apikeyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apikeyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApikeyDto: UpdateApikeyDto) {
    return this.apikeyService.update(+id, updateApikeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apikeyService.remove(+id);
  }
}
