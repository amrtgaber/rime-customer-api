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

  async create(createApikeyDto: CreateApikeyDto) {
    const { userId, username } = createApikeyDto;
    const generatedApikey = await this.generateApiKey(userId, username);
    const hash = await argon.hash(generatedApikey);

    const apikey = await this.prisma.apiKey.create({
      data: {
        hash,
        user: {
          connect: { id: userId },
        },
      },
    });

    return {
      apikey: generatedApikey,
      createdAt: apikey.createdAt,
      updatedAt: apikey.updatedAt,
    };
  }

  generateApiKey(userId: number, username: string): Promise<string> {
    const payload = {
      sub: userId,
      username,
      createdAt: new Date(),
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
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
