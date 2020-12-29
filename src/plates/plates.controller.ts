import { Controller, Get } from '@nestjs/common';
import { PlatesService } from './plates.service';

@Controller('api/plates')
export class PlatesController {
  constructor(private readonly plateService: PlatesService) {}
  @Get()
  getAll() {
    return 'Hello World!';
  }
}
