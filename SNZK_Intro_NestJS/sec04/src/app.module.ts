import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ItemsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
