import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApikeyDto } from './dto/create-apikey.dto';
import { UpdateApikeyDto } from './dto/update-apikey.dto';

@Injectable()
export class ApikeyService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  generateApiKey() {
    return this.jwt.signAsync('', {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
  }

  async create(createApikeyDto: CreateApikeyDto) {
    const generatedApikey = await this.generateApiKey();
    const hash = await argon.hash(generatedApikey);

    const apikey = await this.prisma.apiKey.create({ data: { hash } });

    return {
      apikey: generatedApikey,
      createdAt: apikey.createdAt,
      updatedAt: apikey.updatedAt,
    };
  }

  findAll() {
    return `This action returns all apikey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apikey`;
  }

  update(id: number, updateApikeyDto: UpdateApikeyDto) {
    return `This action updates a #${id} apikey`;
  }

  remove(id: number) {
    return `This action removes a #${id} apikey`;
  }
}
