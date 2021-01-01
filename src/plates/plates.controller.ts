import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlateDto } from './dto/create-plate.dto';
import { PlatesService } from './plates.service';
import { Plate } from './schemas/plate.schema';

@Controller('api/plates')
export class PlatesController {
  constructor(private readonly plateService: PlatesService) {}
  @Get()
  getAll(): Promise<Plate[]> {
    return this.plateService.findAll();
  }

  @Post()
  create(@Body() plateData: CreatePlateDto) {
    return this.plateService.create(plateData);
  }
}
