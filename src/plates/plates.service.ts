import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlateDto } from './dto/create-plate.dto';
import { Plate, PlateDocument } from './schemas/plate.schema';

@Injectable()
export class PlatesService {
  constructor(
    @InjectModel(Plate.name) private plateModel: Model<PlateDocument>,
  ) {}

  async create(createPlateDto: CreatePlateDto): Promise<Plate> {
    const createdPlate = new this.plateModel(createPlateDto);
    return createdPlate.save();
  }

  async findAll(): Promise<Plate[]> {
    return this.plateModel.find().exec();
  }
}
