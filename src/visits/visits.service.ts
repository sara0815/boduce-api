import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Visit, VisitDocument } from './schemas/visit.schema';

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit.name) private visitModel: Model<VisitDocument>,
  ) {}
  async increaseTodayVisitsCount(visitDate: string) {
    try {
      const findVisits = await this.visitModel
        .findOne({ date: visitDate })
        .exec();
      if (findVisits) {
        return this.updateTodayVisits(findVisits);
      }
      return this.createTodayVisits(visitDate);
    } catch (err) {
      console.error(err);
      return;
    }
  }

  private async createTodayVisits(visitDate: string) {
    try {
      const createVisitDto = new CreateVisitDto();
      createVisitDto.date = visitDate;
      const createdTodayVisits = await new this.visitModel(
        createVisitDto,
      ).save();
      return createdTodayVisits;
    } catch (err) {
      console.error(err);
      return;
    }
  }

  private async updateTodayVisits(findVisits: VisitDocument) {
    try {
      const updatedTodayVisits = await this.visitModel
        .findOneAndUpdate(
          { date: findVisits.date },
          { count: findVisits.count + 1 },
        )
        .exec();
      return updatedTodayVisits;
    } catch (err) {
      console.error(err);
      return;
    }
  }
}
