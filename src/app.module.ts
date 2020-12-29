import { Module } from '@nestjs/common';
import { PlatesModule } from './plates/plates.module';

@Module({
  imports: [PlatesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
