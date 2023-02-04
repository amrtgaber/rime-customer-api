import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApikeyService } from './apikey.service';
import { ApikeyController } from './apikey.controller';

@Module({
  imports: [JwtModule.register({})],
  controllers: [ApikeyController],
  providers: [ApikeyService],
})
export class ApikeyModule {}
