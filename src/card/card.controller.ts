import {
  Body,
  Controller,
  Headers,
  Inject,
  BadRequestException,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CardDto } from './dto/card.dto';
import { HeadersDto } from 'src/dto/headers.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UUIDProvider } from '../providers/uuid/uuid';
import { PaymentNetworkProvider } from '../providers/payment-network/payment-network';
import { DateProvider } from '../providers/date/date';
import { CardEntity } from './entity/card.entity';
import { ResponseProvider } from './providers/response.providers';
import { LoggerProvider } from '../providers/logger/logger';
import { IResponse } from './providers/response.interface';

@Controller('cards')
export class CardController {
  constructor(
    private readonly UUIDProvider: UUIDProvider,
    private readonly cardService: CardService,
    private readonly dateProvider: DateProvider,
    private readonly paymentNetworkProvider: PaymentNetworkProvider,
    private readonly responseProvider: ResponseProvider,
    private readonly loggerProvider: LoggerProvider,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('tokens')
  async saveCard(
    @Body() request: CardDto,
    @Headers() headers: HeadersDto,
  ): Promise<IResponse> {
    // Valida si se envia el token y el formato
    if (!headers.authorization || !headers.authorization.includes('pk_')) {
      this.loggerProvider.warn('Mandatory trading token in "pk_" format');
      throw new BadRequestException('Mandatory trading token in "pk_" format');
    }

    // Genera un identificado unico por request
    const reqId = this.UUIDProvider.generateShortUUID();

    // guarda la data en la db fisica
    this.loggerProvider.log(`RequestId: ${reqId} => Saved Card`);
    const newCard = await this.cardService.saveCard({
      merchantId: headers.authorization.split(' ').at(1),
      reqId: reqId,
      bin: request.card_number.substring(0, 6),
      last4: request.card_number.substring(request.card_number.length - 4),
      cvv: request.cvv,
      email: request.email,
      expirationMonth: request.expiration_month,
      expirationYear: request.expiration_year,
      network: this.paymentNetworkProvider.resolvePaymentNetwork(
        request.card_number,
      ),
      regDate: this.dateProvider.currentDateUTC(),
      regDatetime: this.dateProvider.currentTimestamp(),
      regTimestamp: this.dateProvider.epoch(),
    });

    // elimina data sensible
    delete newCard.cvv;
    delete newCard.cardId;

    // guarda en cache (Redis) por 15min
    this.cacheManager.set(reqId, newCard);
    this.loggerProvider.log(`RequestId: ${reqId} => Saved Card in db memory`);
    return this.responseProvider.format(reqId, newCard, 'saved card');
  }

  @Get('tokens/:reqId')
  async getSavedCard(
    @Param() { reqId }: { reqId: string },
  ): Promise<IResponse> {
    // valida la longitud del reqId
    if (reqId.length !== this.UUIDProvider.defaultLength) {
      this.loggerProvider.warn(`the "req Id" sent is invalid`);
      throw new BadRequestException('the "req Id" sent is invalid');
    }

    // busca si aun se encuentra en cache
    const savedCard = await this.cacheManager.get<CardEntity>(reqId);

    // valida si no existe la card en la db in memory (cache)
    if (savedCard === null) {
      const card = await this.cardService.findByReqId(reqId);
      return this.responseProvider.format(
        reqId,
        card,
        card === null ? 'card not found' : 'card found (in db)',
      );
    }

    return this.responseProvider.format(
      reqId,
      savedCard,
      'card found (in memory)',
    );
  }
}
