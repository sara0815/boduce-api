import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatesController } from './plates.controller';
import { PlatesService } from './plates.service';
import { Plate, PlateSchema } from './schemas/plate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plate.name, schema: PlateSchema }]),
  ],
  controllers: [PlatesController],
  providers: [PlatesService],
})
export class PlatesModule {}
