import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Post('/:id/vote')
  vote(@Param('id') plateId: string) {
    return this.plateService.vote(plateId);
  }
}
