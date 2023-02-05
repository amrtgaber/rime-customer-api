import { ApiProperty } from '@nestjs/swagger';
import { ApiKey, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ApikeyEntity implements ApiKey {
  @Exclude()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @Exclude()
  hash: string;

  @ApiProperty()
  apikey: string;

  @ApiProperty()
  user: User;

  @Exclude()
  userId: number;

  constructor(partial: Partial<ApikeyEntity>) {
    Object.assign(this, partial);
  }
}
