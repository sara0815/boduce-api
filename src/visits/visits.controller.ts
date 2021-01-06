import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Visit } from './schemas/visit.schema';
import { VisitsService } from './visits.service';

@Controller('api/visits')
export class VisitsController {
  constructor(private readonly visitService: VisitsService) {}
  @Post()
  visits(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    if (!req.cookies['boduce']) {
      res.cookie('boduce', '1', { maxAge: 86400000 });
      return this.visitService.increaseTodayVisitsCount(this.getTodayString());
    }
    return { data: null };
  }

  private getTodayString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
