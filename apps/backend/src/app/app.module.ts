import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TheaterModule } from '../theater/theater.module';

@Module({
  imports: [TheaterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
