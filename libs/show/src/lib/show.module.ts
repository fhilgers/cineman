import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { PrismaModule } from '@cineman/prisma';
import { NotOverlappingForTheaterRule, ShowExistsRule } from './show.validator';

export { CreateShowDto } from './dto/create-show.dto';
export { UpdateShowDto } from './dto/update-show.dto';
export { IShowGateway } from './gateway/gateway';

export { IsShow } from './show.validator';

@Module({
  imports: [PrismaModule],
  controllers: [ShowController],
  providers: [ShowService, NotOverlappingForTheaterRule, ShowExistsRule],
  exports: [ShowExistsRule],
})
export class ShowModule {}
