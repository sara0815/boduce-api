import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findPlates(tags: string[]): Promise<Plate[]> {
    const findArgs = {};
    if (tags.length > 0) {
      findArgs['tags'] = {
        $all: tags,
      };
    }
    return this.plateModel.find(findArgs).exec();
  }

  async findByPlateId(plateId: string): Promise<Plate> {
    const plate = this.plateModel.findById(plateId);
    if (!plate) {
      throw new NotFoundException(`Plate with ID ${plateId} is not found.`);
    }
    return plate;
  }

  async vote(plateId: string) {
    const plate = this.findByPlateId(plateId);
    return this.plateModel.findByIdAndUpdate(plateId, {
      vote: (await plate).vote ? (await plate).vote + 1 : 1,
    });
  }
}
