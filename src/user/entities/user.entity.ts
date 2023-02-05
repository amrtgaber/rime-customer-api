import { ApiProperty } from '@nestjs/swagger';
import { ApiKey, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

import { ApikeyEntity } from 'src/apikey/entities/apikey.entity';

export class UserEntity implements User {
  @Exclude()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  username: string;

  @ApiProperty({ type: ApikeyEntity })
  apikey: ApiKey;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
