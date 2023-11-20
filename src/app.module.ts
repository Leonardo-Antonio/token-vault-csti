import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { CardModule } from './card/card.module';
import { MemoryModule } from './db/memory/memory.module';
import { UUIDProvider } from './providers/uuid/uuid';
import { DateProvider } from './providers/date/date';
import { LoggerProvider } from './providers/logger/logger';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MemoryModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService, UUIDProvider, DateProvider, LoggerProvider],
})
export class AppModule {}
