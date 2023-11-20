import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './entity/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
  ) {}

  findAll(): Promise<CardEntity[]> {
    return this.cardRepository.find();
  }

  findByReqId(reqId: string): Promise<CardEntity> {
    return this.cardRepository.findOne({
      where: { reqId },
    });
  }

  saveCard(card: CardEntity) {
    return this.cardRepository.save(card);
  }
}
