import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entity/card.entity';
import { MemoryModule } from '../db/memory/memory.module';
import { UUIDProvider } from '../providers/uuid/uuid';
import { PaymentNetworkProvider } from '../providers/payment-network/payment-network';
import { DateProvider } from '../providers/date/date';
import { ResponseProvider } from './providers/response.providers';
import { LoggerProvider } from '../providers/logger/logger';

@Module({
  imports: [MemoryModule, TypeOrmModule.forFeature([CardEntity])],
  controllers: [CardController],
  providers: [
    CardService,
    UUIDProvider,
    PaymentNetworkProvider,
    DateProvider,
    ResponseProvider,
    LoggerProvider,
  ],
})
export class CardModule {}
