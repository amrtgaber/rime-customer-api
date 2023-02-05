import { ApiProperty } from '@nestjs/swagger';

export class CreateApikeyDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  username: string;
}
